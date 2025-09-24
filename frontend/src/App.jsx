import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import TopStrip from "./components/TopStrip";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Modules from "./pages/Modules";
import NGOs from "./pages/NGOs";
import Hospitals from "./pages/Hospitals";
import EmergencyContacts from "./pages/EmergencyContacts";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Teachers from "./pages/Teachers";
import Students from "./pages/Students";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ChatAssistant from "./components/ChatAssistant";

// Layout component to handle Navbar/TopStrip/Footer visibility
const Layout = ({ children }) => {
  const location = useLocation();
  const hideNav =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNav && <TopStrip />}
      {!hideNav && <Navbar />}
      <main className={`${!hideNav ? "pt-[97px]" : ""}`}>{children}</main>
      {!hideNav && <Footer />}
    </>
  );
};

// AppContent handles page transitions and loader
const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600); // simulate transition
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Determine if ChatAssistant should show
  const hideChat =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/modules" element={<Modules />} />
            <Route path="/ngos" element={<NGOs />} />
            <Route path="/hospitals" element={<Hospitals />} />
            <Route
              path="/services/emergency-contacts"
              element={<EmergencyContacts />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/students" element={<Students />} />
          </Routes>
        </Layout>
      )}

      {/* ChatAssistant: show on all pages except login/signup */}
      {!hideChat && <ChatAssistant />}

      {/* Toast notifications */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

// Main App
const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
