import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const QuizResultsModal = ({ results, onClose }) => {
  if (!results) return null;

  const { score, total } = results;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Quiz Complete!
        </h2>
        <p className="text-lg text-gray-600 mb-6">Here's how you did:</p>

        <div
          className={`relative w-48 h-48 mx-auto flex items-center justify-center rounded-full ${
            percentage >= 50 ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <p
            className={`text-5xl font-bold ${
              percentage >= 50 ? "text-green-600" : "text-red-600"
            }`}
          >
            {percentage}%
          </p>
        </div>

        <div className="flex justify-around mt-8 text-lg">
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-500" />
            <div>
              <p className="font-bold">{score}</p>
              <p className="text-gray-500 text-sm">Correct</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <XCircle className="text-red-500" />
            <div>
              <p className="font-bold">{total - score}</p>
              <p className="text-gray-500 text-sm">Incorrect</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuizResultsModal;
