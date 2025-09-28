import React from "react";
import { X } from "lucide-react";

const DetailedResultsModal = ({ attemptDetails, onClose }) => {
  if (!attemptDetails) return null;

  const { score, total_questions, original_questions, student_answers } =
    attemptDetails;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl h-[90vh] flex flex-col">
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Quiz Results</h2>
          <h3 className="text-xl font-bold text-blue-600">
            You Scored: {score} / {total_questions}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto pr-2 space-y-6">
          {original_questions.map((q, index) => {
            const studentAnswer = student_answers[index]?.selected;
            const correctAnswer = q.answer;
            const isCorrect = studentAnswer === correctAnswer;

            return (
              <div key={index} className="border p-4 rounded-lg bg-gray-50">
                <p className="text-lg font-semibold mb-3 text-gray-900">
                  {index + 1}. {q.question}
                </p>
                <div className="space-y-2">
                  {q.options.map((option, optIndex) => {
                    let style = "border-gray-300";
                    if (option === correctAnswer) {
                      style = "bg-green-100 border-green-500 text-green-800";
                    }
                    if (option === studentAnswer && !isCorrect) {
                      style = "bg-red-100 border-red-500 text-red-800";
                    }

                    return (
                      <p
                        key={optIndex}
                        className={`p-3 rounded-md border-2 ${style}`}
                      >
                        {option}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailedResultsModal;
