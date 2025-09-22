import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2b5280] text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#90f6ff]">
            AlertSikhsha
          </h2>
          <p className="text-sm leading-relaxed">
            Preparing students for disasters, one drill at a time. Together, we
            build safer communities.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#90f6ff]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-[#90f6ff] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#90f6ff] transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/teachers" className="hover:text-[#90f6ff] transition">
                Teachers
              </Link>
            </li>
            <li>
              <Link to="/students" className="hover:text-[#90f6ff] transition">
                Students
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#90f6ff]">
            Stay Connected
          </h3>
          <p className="text-sm mb-2">Follow us on social media:</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-[#90f6ff] transition">
              Twitter
            </a>
            <a href="#" className="hover:text-[#90f6ff] transition">
              LinkedIn
            </a>
            <a href="#" className="hover:text-[#90f6ff] transition">
              Instagram
            </a>
          </div>
        </div>
      </div>
      <div className="bg-[#1e3a5f] text-center py-4 text-sm">
        © {new Date().getFullYear()} AlertSikhsha. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
