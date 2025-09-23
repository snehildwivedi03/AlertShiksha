import React from "react";
import HeroSection from "../components/HeroSection";
import banner from "../assets/banner.png";
import WhyPreparedness from "../components/WhyPreparedness";
import GovtInitiative from "../components/GovtInitiative";
import ChatAssistant from "../components/ChatAssistant";

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <div className="w-full">
        <img
          src={banner}
          alt="Alert Shiksha Banner"
          className="w-full h-[450px] object-cover"
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

      {/* Govt Initiatives */}
      <div className="container mx-auto px-6 py-12">
        <GovtInitiative />
      </div>

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
