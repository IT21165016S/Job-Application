import React, { useState } from "react";
import axios from "axios";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null,
  });
  const [uploadMessage, setUploadMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "cv") {
      setFormData({ ...formData, cv: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadMessage("Uploading...");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("cv", formData.cv);

    try {
      const response = await axios.post("http://localhost:5000/api/cv/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Upload Response:", response.data);
      setUploadMessage("CV uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      setUploadMessage("Failed to upload CV.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Submit Your CV</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          onChange={handleChange}
          value={formData.name}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          onChange={handleChange}
          value={formData.phone}
          required
        />
        <input
          type="file"
          name="cv"
          className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition file:cursor-pointer"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
      {uploadMessage && (
        <p
          className={`mt-4 text-center text-sm ${
            uploadMessage.includes("successfully") ? "text-green-600" : "text-red-500"
          }`}
        >
          {uploadMessage}
        </p>
      )}
    </div>
  );
};

export default JobApplicationForm;
