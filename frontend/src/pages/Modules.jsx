import React from "react";
import ModuleCard from "./ModuleCard";
import pdfImg from "../assets/pdf.png";
import videoImg from "../assets/video.png";
import quizImg from "../assets/quiz.png";

const Modules = () => {
  // Hardcoded modules for now; replace with API fetch later
  const pdfModules = [
    {
      title: "Earthquake Safety Basics",
      url: "/pdfs/earthquack.pdf",
      img: pdfImg,
      description: "PDF module for earthquake safety (Nursery-12).",
    },
    {
      title: "Fire Safety Guide",
      url: "/pdfs/Fire_Safety.pdf",
      img: pdfImg,
      description: "PDF module for fire safety (College).",
    },
    {
      title: "Floods",
      url: "/pdfs/floods.pdf",
      img: pdfImg,
      description: "PDF module for fire safety (College).",
    },
  ];

  const videoModules = [
    {
      title: "Flood Preparedness Video",
      url: "https://www.youtube.com/embed/pi_nUPcQz_A",
      description: "Video module for flood preparedness.",
      type: "video",
    },
    {
      title: "Earthquack Awareness",
      url: "https://www.youtube.com/embed/BLEPakj1YTY?si=V9BX7KYzU1KuUDQz",
      description: "Video module on pandemic safety measures.",
      type: "video",
    },
    {
      title: "FireSafety",
      url: "https://www.youtube.com/embed/Xgc90CoJbDI?si=B7C3XKFrbjwsTkmY",
      description: "Video module on pandemic safety measures.",
      type: "video",
    },
  ];

  const quizModules = [
    {
      title: "Earthquake Quiz",
      url: "/quizzes/earthquake", // placeholder
      img: quizImg,
      description: "Test your knowledge on earthquake preparedness.",
    },
    {
      title: "Fire Safety Quiz",
      url: "/quizzes/fire", // placeholder
      img: quizImg,
      description: "Check your understanding of fire safety.",
    },
    {
      title: "Fire Safety Quiz",
      url: "/quizzes/fire", // placeholder
      img: quizImg,
      description: "Check your understanding of fire safety.",
    },
  ];

  const renderSection = (title, modules) => (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-[#20538c] text-center mb-8">
        {title}
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {modules.map((module, idx) => (
          <ModuleCard
            key={idx}
            title={module.title}
            type={
              module.url.endsWith(".pdf")
                ? "pdf"
                : module.url.includes("youtube")
                ? "video"
                : "quiz"
            }
            url={module.url}
            description={module.description}
            img={module.img}
          />
        ))}
      </div>
    </section>
  );

  return (
    <div>
      {renderSection("PDF Modules", pdfModules)}
      {renderSection("Video Modules", videoModules)}
      {renderSection("Quiz Modules", quizModules)}
    </div>
  );
};

export default Modules;
