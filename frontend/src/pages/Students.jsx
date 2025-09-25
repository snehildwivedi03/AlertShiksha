// src/pages/Students.jsx
import React from "react";
import { PlayCircle } from "lucide-react"; // join/start icon
import ModuleCard from "../pages/ModuleCard";
import profileImg from "../assets/profile.png"; // Assuming student profile uses the same placeholder

function Students() {
  // Mock data for the student's perspective
  const myPerformance = [
    { quizName: "Fire safety Quiz", score: "85%", date: "2025-09-24" },
    { quizName: "Earthquack Quiz", score: "92%", date: "2025-09-22" },
    { quizName: "Flood Quiz", score: "78%", date: "2025-09-20" },
    { quizName: "Algebra Basics", score: "95%", date: "2025-09-18" },
    { quizName: "World History Intro", score: "88%", date: "2025-09-15" },
  ];

  const availableQuizzes = [
    {
      title: "Fire safety Quiz",
      description: "A quiz based on fire safety concepts.",
      img: "https://via.placeholder.com/400x200/e53e3e/ffffff?text=Fire+Safety",
    },
    {
      title: "Earthquack Quiz",
      description: "Test your knowledge on earthquake preparedness.",
      img: "https://via.placeholder.com/400x200/718096/ffffff?text=Earthquake",
    },
    {
      title: "Flood Quiz",
      description: "Answer questions about flood safety and response.",
      img: "https://via.placeholder.com/400x200/3182ce/ffffff?text=Flood+Safety",
    },
  ];

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* TOP ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* My Performance Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-[#1d4e89] mb-4">
            My Recent Performance
          </h2>
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {myPerformance.map((perf, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 rounded-xl p-3 shadow-sm hover:bg-gray-100 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={profileImg}
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="font-medium text-gray-800">
                    {perf.quizName}
                  </span>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-green-600">
                    Score: {perf.score}
                  </p>
                  <p className="text-gray-500">{perf.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Join Quiz */}
        <div className="bg-gradient-to-br from-[#1d4e89] to-[#2563eb] shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center text-center text-white hover:shadow-2xl transition">
          <PlayCircle className="w-16 h-16 mb-4" />
          <h2 className="text-xl font-bold mb-3">Join a New Quiz</h2>
          <p className="opacity-90 mb-4">
            Enter the code from your teacher to start.
          </p>
          <div className="w-full max-w-xs flex gap-2">
            <input
              type="text"
              placeholder="Enter Quiz Code"
              className="w-full px-4 py-2 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-[#1d4e89] font-bold px-4 py-2 rounded-lg hover:bg-gray-200 transition">
              Join
            </button>
          </div>
        </div>

        {/* How to Take a Quiz */}
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-[#1d4e89]">
            How to Take a Quiz
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Enter the quiz code in the 'Join Quiz' section</li>
            <li>Click the 'Join' button to begin</li>
            <li>Answer all questions within the time limit</li>
            <li>Review your score in the performance section</li>
          </ol>
        </div>
      </div>

      {/* MY QUIZZES */}
      <div>
        <h2 className="text-2xl font-bold text-center text-[#1d4e89] mb-6">
          My Quizzes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableQuizzes.map((quiz, index) => (
            <ModuleCard
              key={index}
              title={quiz.title}
              type="Quiz"
              url="#"
              description={quiz.description}
              img={quiz.img}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Students;
