import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [cvs, setCvs] = useState([]);

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cv/all");
      setCvs(response.data);
    } catch (error) {
      console.error("Error fetching CVs:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Uploaded CVs</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>CV</th>
            <th>Education</th>
            <th>Skills</th>
            <th>Projects</th>
          </tr>
        </thead>
        <tbody>
          {cvs.map((cv) => (
            <tr key={cv._id}>
              <td>{cv.name || "N/A"}</td>
              <td>{cv.email || "N/A"}</td>
              <td>{cv.phone || "N/A"}</td>
              <td>
                {cv.cvPublicLink ? (
                  <a href={cv.cvPublicLink} target="_blank" rel="noopener noreferrer">
                    View PDF
                  </a>
                ) : (
                  "No CV Available"
                )}
              </td>
              <td>{Array.isArray(cv.education) ? cv.education.join(", ") : "N/A"}</td>
              <td>{Array.isArray(cv.skills) ? cv.skills.join(", ") : "N/A"}</td>
              <td>{Array.isArray(cv.projects) ? cv.projects.join(", ") : "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { maxWidth: "900px", margin: "20px auto", textAlign: "center" },
  table: { width: "100%", borderCollapse: "collapse" },
};

export default Dashboard;
