import { useState } from "react";
import axios from "axios";

const JobApplicationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    cv: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, cv: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("phone", formData.phone);
    form.append("cv", formData.cv);

    console.log("Sending Form Data:", formData); // Debugging Log

    try {
      const response = await axios.post("http://localhost:5000/api/cv/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("CV uploaded successfully!");
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error uploading CV");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} required />
      <button type="submit">Submit</button>
    </form>
  );
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "0 auto",
  },
};

export default JobApplicationForm;
