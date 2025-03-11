import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [cvList, setCvList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/cv/all");
        console.log("Fetched CVs from API:", response.data);

        if (Array.isArray(response.data)) {
          setCvList(response.data);
        } else {
          console.error("Unexpected response format:", response.data);
          setError("Unexpected response format. Please try again later.");
        }
      } catch (err) {
        console.error("Failed to fetch CVs:", err);
        setError("Failed to fetch CVs. Please check your connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchCVs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Uploaded CVs
      </h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading CVs...</p>
      ) : error ? (
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-3">Name</th>
                <th className="border p-3">Email</th>
                <th className="border p-3">Phone</th>
                <th className="border p-3">View CV</th>
              </tr>
            </thead>
            <tbody>
              {cvList.length > 0 ? (
                cvList.map((cv) => (
                  <tr key={cv._id} className="text-center border-b hover:bg-gray-50">
                    <td className="border p-3">{cv.name || "N/A"}</td>
                    <td className="border p-3">{cv.email || "N/A"}</td>
                    <td className="border p-3">{cv.phone || "N/A"}</td>
                    <td className="border p-3">
                      {cv.cvPublicLink ? (
                        <a
                          href={cv.cvPublicLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 font-medium hover:underline"
                        >
                        View PDF
                        </a>
                      ) : (
                        "No CV Available"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4 text-gray-500">
                    No CVs uploaded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
