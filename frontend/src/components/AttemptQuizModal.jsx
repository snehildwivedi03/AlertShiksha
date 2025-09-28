import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, AlertTriangle, Play } from "lucide-react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // Import useAuth to get token & user

const AttemptQuizModal = ({ quiz, onQuizEnd }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const modalRef = useRef(null);
  const { token, user } = useAuth(); // ✅ Ensure user has _id as studentId

  // Parse questions on mount
  useEffect(() => {
    const parsedQuestions =
      typeof quiz.questions === "string"
        ? JSON.parse(quiz.questions)
        : quiz.questions;
    setQuestions(parsedQuestions || []);
    if (parsedQuestions) {
      setTimeLeft(parsedQuestions.length * 60); // 1 min per question
    }
  }, [quiz]);

  // Start quiz & enter fullscreen
  const handleStartQuiz = () => {
    const elem = modalRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Error entering full-screen:", err.message);
      });
    }
    setQuizStarted(true);
  };

  // Timer
  useEffect(() => {
    if (!quizStarted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  // Select an answer
  const handleSelectAnswer = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  // Submit quiz
  const handleSubmit = useCallback(async () => {
    if (document.fullscreenElement) document.exitFullscreen();

    const submissionData = {
      studentName: user?.name,
      studentId: user?._id, // logged-in student ID
      answers: questions.map((q, index) => ({
        question: q.question,
        selected: selectedAnswers[index] || null,
      })),
    };

    try {
      const res = await axios.post(
        `http://localhost:5000/api/quizzes/${quiz.code}/submit`, // ✅ Correct route
        submissionData,
        { headers: { Authorization: `Bearer ${token}` } } // auth token
      );
      onQuizEnd(res.data);
    } catch (err) {
      console.error("❌ Failed to submit quiz:", err);
      alert("There was an error submitting your quiz.");
      onQuizEnd(null);
    }
  }, [quiz.code, questions, selectedAnswers, onQuizEnd, token, user]);

  // Auto-submit when timer ends
  useEffect(() => {
    if (quizStarted && timeLeft === 0) handleSubmit();
  }, [timeLeft, quizStarted, handleSubmit]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 bg-white flex flex-col p-6 z-[100]"
    >
      {!quizStarted ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            {quiz.title}
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            You have {questions.length} questions to answer.
          </p>
          <button
            onClick={handleStartQuiz}
            className="bg-green-600 text-white px-10 py-4 rounded-lg font-bold text-xl hover:bg-green-700 transition-transform transform hover:scale-105 flex items-center gap-3"
          >
            <Play size={24} /> Start Quiz
          </button>
          <p className="text-sm text-gray-500 mt-4">
            This will attempt to enter full-screen mode.
          </p>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
              <p className="text-gray-500">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>
            <div className="text-2xl font-bold text-red-500 bg-red-100 px-4 py-2 rounded-lg">
              {formatTime(timeLeft)}
            </div>
          </div>

          {/* Fullscreen Warning */}
          <div className="flex items-center justify-center bg-yellow-100 p-2 my-4 rounded-md text-yellow-800 text-sm">
            <AlertTriangle className="mr-2" size={18} />
            Please do not exit full-screen mode until the quiz is submitted.
          </div>

          {/* Question Body */}
          <div className="flex-grow my-6 overflow-y-auto">
            {currentQuestion && (
              <div>
                <p className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQuestion.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() =>
                        handleSelectAnswer(currentQuestionIndex, option)
                      }
                      className={`p-4 rounded-lg text-left text-lg transition border-2 ${
                        selectedAnswers[currentQuestionIndex] === option
                          ? "bg-blue-600 text-white border-blue-700"
                          : "bg-gray-100 hover:bg-blue-100 border-gray-200"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Navigation & Submission */}
          <div className="flex justify-between items-center border-t pt-4">
            <button
              onClick={() =>
                setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestionIndex === 0}
              className="bg-gray-200 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 disabled:opacity-50"
            >
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentQuestionIndex((prev) =>
                    Math.min(questions.length - 1, prev + 1)
                  )
                }
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700"
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AttemptQuizModal;
