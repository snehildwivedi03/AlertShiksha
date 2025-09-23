import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    if (token && storedRole) setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/login");
  };

  const activeClass =
    "text-yellow-300 underline underline-offset-4 font-semibold";
  const inactiveClass = "hover:text-gray-200 transition-colors";

  const roleLink = role === "student" ? "/students" : "/teachers";
  const roleLabel = role === "student" ? "Students" : "Teachers";

  return (
    <nav className="bg-[#2b5280] text-white shadow-md fixed w-full z-40 top-[32px]">
      <div className="container mx-auto flex justify-between items-center px-6 py-3">
        <NavLink to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </NavLink>

        <div className="hidden md:flex space-x-8 font-medium items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            About
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to={roleLink}
                className={({ isActive }) =>
                  `${
                    isActive ? activeClass : inactiveClass
                  } px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition`
                }
              >
                {roleLabel}
              </NavLink>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${
                    isActive ? activeClass : ""
                  } px-4 py-2 rounded-lg border border-[#2f6bb2] bg-white text-[#20538c] hover:bg-[#eaf2fb] transition`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${
                    isActive ? activeClass : ""
                  } px-4 py-2 rounded-lg bg-[#2f6bb2] hover:bg-[#3a7dd1] transition`
                }
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile menu */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#20538c] shadow-lg px-6 py-4 space-y-4 font-medium">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            About
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to={roleLink}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
              >
                {roleLabel}
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg border border-[#2f6bb2] bg-white text-[#20538c] hover:bg-[#eaf2fb] transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg bg-[#2f6bb2] hover:bg-[#3a7dd1] transition"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
