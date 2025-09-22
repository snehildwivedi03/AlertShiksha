import React from "react";
import dummy1 from "../assets/dummy1.png";
import dummy2 from "../assets/dummy2.png";

const About = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#20538c] to-[#2f6bb2] text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About AlertSikhsha
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          A Government of Punjab initiative to integrate disaster preparedness
          education into schools and colleges.
        </p>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[#20538c] mb-4">
            What is AlertSikhsha?
          </h2>
          <p className="text-gray-700 mb-4">
            AlertSikhsha is a digital platform designed to educate and empower
            students, teachers, and institutions about disaster management. It
            provides structured learning modules, real-time alerts, and virtual
            drills to prepare communities for natural calamities.
          </p>
          <p className="text-gray-700">
            By embedding disaster education into everyday learning, we aim to
            build safer campuses and resilient societies.
          </p>
        </div>
        <img
          src={dummy1}
          alt="Disaster Preparedness"
          className="rounded-lg shadow-md"
        />
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          <img
            src={dummy2}
            alt="Government Initiative"
            className="rounded-lg shadow-md"
          />
          <div>
            <h2 className="text-2xl font-semibold text-[#20538c] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-4">
              Our mission is to instill awareness, reduce panic, and ensure
              coordinated responses in times of disaster. Through gamified
              drills, multilingual support, and real-time alerts, AlertSikhsha
              brings disaster education to every student.
            </p>
            <p className="text-gray-700">
              This initiative is aligned with national disaster management
              policies and strengthens collaboration between schools, local
              authorities, and emergency responders.
            </p>
          </div>
        </div>
      </section>

      {/* Core Objectives */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-[#20538c] text-center mb-8">
          Core Objectives
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="font-bold text-[#20538c] mb-2">Education</h3>
            <p className="text-gray-600 text-sm">
              Integrating disaster management into the academic curriculum.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="font-bold text-[#20538c] mb-2">Preparedness</h3>
            <p className="text-gray-600 text-sm">
              Regular drills and simulations for students and staff.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="font-bold text-[#20538c] mb-2">Awareness</h3>
            <p className="text-gray-600 text-sm">
              Promoting a culture of safety and resilience in campuses.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6 text-center">
            <h3 className="font-bold text-[#20538c] mb-2">Collaboration</h3>
            <p className="text-gray-600 text-sm">
              Working with NDMA, schools, and local authorities for impact.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
