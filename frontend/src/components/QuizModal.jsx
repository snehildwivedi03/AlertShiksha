import React from "react";

const QuizModal = ({ quiz, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity- flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[600px] max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4 text-[#1d4e89]">
          {quiz.title || quiz.topic} Quiz
        </h2>
        <p className="text-gray-600 mb-4">Code: {quiz.code}</p>

        <ul className="space-y-4">
          {(quiz.questions || quiz.quiz || []).map((q, idx) => (
            <li key={idx} className="border-b pb-2">
              <p className="font-medium">
                {idx + 1}. {q.question}
              </p>
              {q.options && (
                <ul className="list-disc list-inside text-gray-600">
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
