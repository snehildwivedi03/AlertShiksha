import React from "react";
import HeroSection from "../components/HeroSection";
import WhyPreparedness from "../components/WhyPreparedness";
import GovtInitiative from "../components/GovtInitiative";
import LatestNews from "../components/LatestNews";
import ChatAssistant from "../components/ChatAssistant";

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero */}
      <HeroSection />

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 py-12">
        <div className="lg:col-span-2 space-y-12">
          <WhyPreparedness />
          <GovtInitiative />
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <LatestNews />
        </aside>
      </div>
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
      {/* Floating Chat Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default Home;
