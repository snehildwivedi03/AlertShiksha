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

      {/* Floating Chat Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default Home;
