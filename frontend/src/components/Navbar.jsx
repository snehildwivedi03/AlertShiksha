import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const activeClass = "text-yellow-300"; // style for active link
  const inactiveClass = "hover:text-gray-200 transition-colors";

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
          <NavLink
            to="/teachers"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Teachers
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Students
          </NavLink>

          <div className="flex space-x-4">
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
          </div>
        </div>

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
          <NavLink
            to="/teachers"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Teachers
          </NavLink>
          <NavLink
            to="/students"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Students
          </NavLink>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
