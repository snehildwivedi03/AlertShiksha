import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png"; // Your logo is correctly imported here

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");
    setIsAuthenticated(!!token);
    setRole(storedRole);
  }, [location]);

  useEffect(() => {
    const onDocClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsAuthenticated(false);
    setRole(null);
    navigate("/login");
  };

  const closeAll = () => {
    setIsOpen(false);
    setDropdownOpen(false);
    setMobileServicesOpen(false);
  };

  const activeClass =
    "text-yellow-300 underline underline-offset-4 font-semibold";
  const inactiveClass = "hover:text-gray-200 transition-colors";

  const roleLink = role === "student" ? "/students" : "/teachers";
  const roleLabel = role === "student" ? "Students" : "Teachers";

  return (
    <nav className="bg-[#2b5280] text-white shadow-md fixed w-full z-50 top-[32px]">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* --- CHANGE IS HERE --- */}
        {/* The text has been removed, leaving only the logo. This is cleaner and responsive. */}
        <NavLink to="/" onClick={closeAll}>
          <img src={logo} alt="AlertShiksha" className="h-10 w-auto" />
        </NavLink>
        {/* --- END OF CHANGE --- */}

        {/* Desktop */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
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
            to="/blog"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Blog
          </NavLink>

          <NavLink
            to="/modules"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Modules
          </NavLink>

          {/* Services dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 hover:text-gray-200 focus:outline-none"
            >
              Services{" "}
              <ChevronDown
                size={16}
                className={`${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                } transition-transform`}
              />
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ type: "spring", stiffness: 250, damping: 22 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-4 w-[560px] bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200"
                >
                  <div className="grid grid-cols-3 gap-6 p-6">
                    <div className="col-span-1 pr-4 border-r">
                      <h4 className="text-lg font-semibold text-[#20538c] mb-2">
                        Services
                      </h4>
                      <p className="text-sm text-gray-600">
                        Quick access to emergency resources and support —
                        localized for your institution.
                      </p>
                      <div className="mt-3">
                        <button
                          className="text-sm px-3 py-1 bg-[#eaf6fb] text-[#20538c] rounded-md hover:bg-blue-100"
                          onClick={() => {
                            navigate("/alerts");
                            closeAll();
                          }}
                        >
                          View Alerts
                        </button>
                      </div>
                    </div>

                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">
                          Emergency
                        </h5>
                        <NavLink
                          to="/alerts"
                          onClick={closeAll}
                          className="block text-sm p-2 rounded hover:bg-gray-100"
                        >
                          Emergency Contacts
                        </NavLink>
                        <NavLink
                          to="/hospitals"
                          onClick={closeAll}
                          className="block text-sm p-2 rounded hover:bg-gray-100"
                        >
                          Nearby Hospitals
                        </NavLink>
                      </div>
                      <div>
                        <h5 className="text-sm font-semibold text-gray-700 mb-2">
                          Support
                        </h5>
                        <NavLink
                          to="/ngos"
                          onClick={closeAll}
                          className="block text-sm p-2 rounded hover:bg-gray-100"
                        >
                          NGOs & Volunteers
                        </NavLink>
                        <NavLink
                          to="/resources"
                          onClick={closeAll}
                          className="block text-sm p-2 rounded hover:bg-gray-100"
                        >
                          Resources & Guides
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? activeClass : inactiveClass
            }
          >
            Contact Us
          </NavLink>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <>
              <NavLink
                to={
                  role
                    ? role === "student"
                      ? "/students"
                      : "/teachers"
                    : "/dashboard"
                }
                className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition"
              >
                {role
                  ? role === "student"
                    ? "Students"
                    : "Teachers"
                  : "Dashboard"}
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
                className="px-4 py-2 rounded-lg border border-[#2f6bb2] bg-white text-[#20538c] hover:bg-[#eaf2fb] transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-4 py-2 rounded-lg bg-[#2f6bb2] hover:bg-[#3a7dd1] transition"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen((s) => !s)}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-[#20538c] shadow-lg px-6 py-4 space-y-4 font-medium"
          >
            <NavLink to="/" onClick={closeAll} className="block">
              Home
            </NavLink>
            <NavLink to="/about" onClick={closeAll} className="block">
              About
            </NavLink>
            <NavLink to="/blog" onClick={closeAll} className="block">
              Blog
            </NavLink>
            <NavLink to="/modules" onClick={closeAll} className="block">
              Modules
            </NavLink>

            <div>
              <button
                onClick={() => setMobileServicesOpen((s) => !s)}
                className="w-full flex items-center justify-between"
              >
                <span className="font-semibold">Services</span>
                <ChevronDown
                  size={16}
                  className={`${
                    mobileServicesOpen ? "rotate-180" : "rotate-0"
                  } transition-transform`}
                />
              </button>

              {mobileServicesOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <NavLink to="/alerts" onClick={closeAll} className="block">
                    Emergency Contacts
                  </NavLink>
                  <NavLink to="/ngos" onClick={closeAll} className="block">
                    NGOs
                  </NavLink>
                  <NavLink to="/hospitals" onClick={closeAll} className="block">
                    Nearby Hospitals
                  </NavLink>
                </div>
              )}
            </div>

            <NavLink to="/contact" onClick={closeAll} className="block">
              Contact Us
            </NavLink>

            {isAuthenticated ? (
              <>
                <NavLink
                  to={roleLink}
                  onClick={closeAll}
                  className="block px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 transition text-center"
                >
                  {roleLabel}
                </NavLink>
                <button
                  onClick={() => {
                    handleLogout();
                    closeAll();
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition text-center"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={closeAll}
                  className="block px-4 py-2 rounded-lg border border-[#2f6bb2] bg-white text-[#20538c] hover:bg-[#eaf2fb] transition text-center"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  onClick={closeAll}
                  className="block px-4 py-2 rounded-lg bg-[#2f6bb2] hover:bg-[#3a7dd1] transition text-center"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
