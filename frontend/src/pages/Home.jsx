import React from "react";
import HeroSection from "../components/HeroSection";
import banner from "../assets/banner.png";
import WhyPreparedness from "../components/WhyPreparedness";
import GovtInitiative from "../components/GovtInitiative";
import ChatAssistant from "../components/ChatAssistant";
import ModuleCard from "./ModuleCard";

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <div className="w-full">
        <img
          src={banner}
          alt="Alert Shiksha Banner"
          className="w-full h-auto max-h-[450px] object-cover"
        />
      </div>

      {/* Who We Are */}
      <section className="container mx-auto px-6 py-12 text-center">
        <h2 className="text-3xl font-bold text-[#20538c] mb-4">Who We Are</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Alert Shiksha is a digital initiative by the Government of Punjab to
          integrate disaster preparedness into schools and colleges. We provide
          interactive learning, real-time alerts, and virtual drills to build a
          disaster-ready generation.
        </p>
      </section>

      {/* Why Teaching Disaster Preparedness is Important */}
      <section className="container mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[#20538c] mb-4">
            Why Disaster Preparedness in Education?
          </h2>
          <p className="text-gray-600 mb-4">
            Schools are the foundation of awareness. By teaching students how to
            respond to disasters, we reduce panic, protect lives, and empower
            young leaders to act responsibly during crises.
          </p>
          <ul className="list-disc pl-6 text-gray-600">
            <li>Prevents chaos and panic during emergencies</li>
            <li>Builds long-term community resilience</li>
            <li>Encourages safety culture among youth</li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            🌍 Earthquake
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            🌊 Flood
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            🔥 Fire
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 text-center">
            🦠 Pandemic
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-[#f8fafc] py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold text-[#20538c] mb-8">
            What We Do
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              📘 <h3 className="font-bold mb-2">Educate</h3>
              <p className="text-gray-600 text-sm">
                Digital modules and localized awareness.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              🏃 <h3 className="font-bold mb-2">Simulate</h3>
              <p className="text-gray-600 text-sm">
                Virtual drills and gamified experiences.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              📢 <h3 className="font-bold mb-2">Respond</h3>
              <p className="text-gray-600 text-sm">
                Real-time alerts and emergency communication.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-[#20538c] text-center mb-8">
          Free Modules for Students
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Interactive PDF and video modules for students of all age groups, from
          Nursery to College.
        </p>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
          {/* PDF Module */}
          <ModuleCard
            title="Earthquake Safety Basics"
            type="pdf"
            url="/pdfs/earthquake_basics.pdf"
            description="Basics of earthquake safety for students."
            img="/images/pdf.png" // add an icon in public/images
          />

          {/* Embedded Video Module */}
          <div className="bg-white shadow-lg rounded-xl p-4 flex flex-col items-center text-center">
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/BLEPakj1YTY?si=V9BX7KYzU1KuUDQz"
              title="Flood Preparedness Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="rounded-lg mb-4"
            ></iframe>
            <h3 className="text-xl font-semibold text-[#20538c] mb-2">
              Flood Preparedness
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Short video on flood preparedness.
            </p>
          </div>

          {/* Another PDF Module */}
          <ModuleCard
            title="Fire Safety Guide"
            type="pdf"
            url="/pdfs/fire_safety_college.pdf"
            description="Important fire safety tips for students."
            img="/images/pdf.png"
          />
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="bg-[#f8fafc] py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-semibold text-[#20538c] text-center mb-8">
            Emergency Contacts
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white shadow-md rounded-lg p-6">
              🚔 Police – 100
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              🚑 Ambulance – 108
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              🔥 Fire – 101
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              🌀 NDMA – 1078
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              🏥 Hospital – 112
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              📞 Local Helpline
            </div>
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

      {/* Map Placeholder */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-[#20538c] text-center mb-6">
          Disaster Affected Areas in Punjab
        </h2>
        <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">
            Map visualization of disaster-prone/affected areas (Coming soon).
          </p>
        </div>
      </section>

      {/* Live News Placeholder */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-2xl font-semibold text-[#20538c] text-center mb-6">
          Live Disaster Updates
        </h2>
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">
            Live news feed from trusted sources (Backend Integration Pending).
          </p>
        </div>
      </section>

      {/* Floating Chat Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default Home;
