import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DashboardButton = ({ isMobile, closeAll }) => {
  const { isAuthenticated, user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    if (closeAll) closeAll(); // Close mobile menu if it's open
    navigate("/login");
  };

  // --- FIX: Wait until the initial auth check is complete ---
  if (isLoading) {
    return null; // Render nothing while we determine the auth state
  }

  // Determine styles for mobile vs. desktop
  const baseClasses = isMobile
    ? "block w-full text-center px-4 py-2 rounded-lg"
    : "px-4 py-2 rounded-lg";

  if (isAuthenticated && user) {
    const roleLink = user.role === "student" ? "/students" : "/teachers";
    const roleLabel = user.role === "student" ? "Students" : "Teachers";

    return (
      <>
        <NavLink
          to={roleLink}
          onClick={closeAll}
          className={`${baseClasses} bg-green-600 hover:bg-green-700 transition`}
        >
          {roleLabel}
        </NavLink>
        <button
          onClick={handleLogout}
          className={`${baseClasses} bg-red-600 hover:bg-red-700 transition`}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <NavLink
        to="/login"
        onClick={closeAll}
        className={`${baseClasses} border border-[#2f6bb2] bg-white text-[#20538c] hover:bg-[#eaf2fb] transition`}
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        onClick={closeAll}
        className={`${baseClasses} bg-[#2f6bb2] hover:bg-[#3a7dd1] transition`}
      >
        Sign Up
      </NavLink>
    </>
  );
};

export default DashboardButton;
