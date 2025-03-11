import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import JobApplicationForm from "./components/JobApplicationForm";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-4">
          Job Application Portal
        </h1>
        <Routes>
          <Route path="/" element={<JobApplicationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
