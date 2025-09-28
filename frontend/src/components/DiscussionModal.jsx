// frontend/src/components/DiscussionModal.jsx

import React from "react";
import { X } from "lucide-react";

const DiscussionModal = ({ quiz, onClose }) => {
  // Safely parse questions which might be a JSON string from the database
  const questions =
    typeof quiz.questions === "string"
      ? JSON.parse(quiz.questions)
      : quiz.questions;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-2xl relative max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h2 className="text-2xl font-bold text-gray-800">
            {quiz.title || quiz.topic} - Discussion
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition"
          >
            <X size={28} />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto pr-2">
          {questions && questions.length > 0 ? (
            questions.map((q, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg border border-gray-200"
              >
                <p className="font-semibold text-lg text-gray-900 mb-3">
                  Q{index + 1}: {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-md text-left text-sm ${
                        option === q.answer
                          ? "bg-green-100 border-green-500 border text-green-800 font-bold"
                          : "bg-white border"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600">
              No questions available for this quiz.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionModal;
