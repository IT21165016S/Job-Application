import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobApplicationForm from "./components/JobApplicationForm";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Job Application Portal</h1>
        <Routes>
          <Route path="/" element={<JobApplicationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
