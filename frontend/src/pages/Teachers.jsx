// src/pages/Teachers.jsx
import React from "react";
import ModuleCard from "../pages/ModuleCard";

function Teachers() {
  const topStudents = [
    "John Doe",
    "Jane Smith",
    "Michael Johnson",
    "Emily Davis",
    "William Brown",
  ];

  return (
    <div className="p-6 space-y-8">
      {/* TOP ROW: 3 CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Steps to Create Quiz */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4 text-[#20538c]">Steps to Create Quiz</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Go to Create Quiz section</li>
            <li>Enter quiz title and description</li>
            <li>Add questions with options</li>
            <li>Save and publish quiz</li>
          </ol>
        </div>

        {/* Create Quiz */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#20538c] mb-4">Create a New Quiz</h2>
          <p className="text-gray-600 mb-6">
            Start creating your quiz by adding title, description and questions.
          </p>
          <button className="bg-[#20538c] text-white px-6 py-3 rounded-lg hover:bg-[#1b436b] transition duration-300">
            Create Quiz
          </button>
        </div>

        {/* Rank Card */}
        <div className="bg-white shadow-lg rounded-xl p-6 text-center">
          <h2 className="text-xl font-bold text-[#20538c] mb-4">Top Students</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-1">
            {topStudents.map((student, index) => (
              <li key={index}>
                Rank #{index + 1} - {student}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* PREVIOUS QUIZZES */}
      <div>
        <h2 className="text-xl font-bold text-[#20538c] mb-4">Previous Quizzes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ModuleCard
            title="Math Quiz"
            type="pdf"
            url="#"
            description="A quiz based on algebra and geometry concepts."
            img="https://via.placeholder.com/400x200"
          />
          <ModuleCard
            title="Science Quiz"
            type="pdf"
            url="#"
            description="Physics and Chemistry fundamental questions."
            img="https://via.placeholder.com/400x200"
          />
          <ModuleCard
            title="History Quiz"
            type="pdf"
            url="#"
            description="Test your knowledge of world history."
            img="https://via.placeholder.com/400x200"
          />
        </div>
      </div>
    </div>
  );
}

export default Teachers;
