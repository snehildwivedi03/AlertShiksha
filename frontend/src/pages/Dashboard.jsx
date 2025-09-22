import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      {/* Top-right links */}
      <header style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
        <Link to="/login" style={{ textDecoration: "none", color: "#1D4ED8" }}>
          Login
        </Link>
        <Link to="/signup" style={{ textDecoration: "none", color: "#1D4ED8" }}>
          Sign Up
        </Link>
      </header>

      {/* Blank dashboard content */}
      <div style={{ marginTop: "100px", textAlign: "center" }}>
        <h1 style={{ fontSize: "36px" }}>Welcome to Dashboard</h1>
        <p>Dashboard page.</p>
      </div>
    </div>
  );
};

export default Dashboard;
