import React, { useState, useEffect, useCallback } from "react";
import { PlayCircle, X, Eye } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import profileImg from "../assets/profile.png";
import AttemptQuizModal from "../components/AttemptQuizModal";
import QuizResultsModal from "../components/QuizResultsModal";
import Loader from "../components/Loader";
import DetailedResultsModal from "../components/DetailedResultsModal";

function Students() {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [quizCode, setQuizCode] = useState(["", "", "", ""]);

  const [liveQuizzes, setLiveQuizzes] = useState([]);
  const [performance, setPerformance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [quizToAttempt, setQuizToAttempt] = useState(null);
  const [quizResults, setQuizResults] = useState(null);
  const [attemptDetails, setAttemptDetails] = useState(null);

  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const authAxios = axios.create({
        headers: { Authorization: `Bearer ${token}` },
      });

      const liveQuizzesPromise = authAxios.get(
        "http://localhost:5000/api/quizzes/live-quizzes"
      );
      const performancePromise = authAxios.get(
        "http://localhost:5000/api/quizzes/performance"
      );

      const [liveQuizzesRes, performanceRes] = await Promise.all([
        liveQuizzesPromise,
        performancePromise,
      ]);

      setLiveQuizzes(liveQuizzesRes.data || []);
      setPerformance(performanceRes.data || []);
    } catch (err) {
      console.error("Failed to fetch student data:", err);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isAuthenticated === null) {
      return;
    }
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [isAuthenticated, navigate, fetchData]);

  const handleInputChange = (e, index) => {
    const value = e.target.value.toUpperCase().slice(0, 1);
    const newCode = [...quizCode];
    newCode[index] = value;
    setQuizCode(newCode);
    if (value && index < 3) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmitCode = async () => {
    const code = quizCode.join("");
    if (code.length !== 4)
      return alert("Please enter a valid 4-character code.");

    try {
      const res = await axios.get(
        `http://localhost:5000/api/quizzes/join/${code}`
      );
      setQuizToAttempt(res.data);
      setShowJoinModal(false);
      setQuizCode(["", "", "", ""]);
    } catch (err) {
      alert("Invalid quiz code or the quiz is no longer live.");
    }
  };

  const handleQuizEnd = (results) => {
    setQuizToAttempt(null);
    setQuizResults(results);
    fetchData();
  };

  const handleViewResult = async (attemptId) => {
    if (!token) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/quizzes/attempt/${attemptId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAttemptDetails(res.data);
    } catch (err) {
      console.error("Failed to fetch attempt details:", err);
      alert("Could not load quiz results.");
    }
  };

  if (isLoading || isAuthenticated === null) {
    return <Loader />;
  }

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-[#1d4e89]">
        Welcome, {user?.name || "Student"}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-[#1d4e89] mb-4">
            My Recent Performance
          </h2>
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {performance.length > 0 ? (
              performance.map((perf) => (
                <div
                  key={perf.attempt_id}
                  className="flex items-center justify-between bg-gray-50 rounded-xl p-3 shadow-sm hover:bg-gray-100 transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={profileImg}
                      alt="profile"
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    <span className="font-medium text-gray-800">
                      {perf.title}
                    </span>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold text-green-600">
                      Score:{" "}
                      {Math.round((perf.score / perf.total_questions) * 100)}%
                    </p>
                    <p className="text-gray-500">
                      {new Date(perf.submitted_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">
                No quizzes attempted yet.
              </p>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1d4e89] to-[#2563eb] shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center text-center text-white hover:shadow-2xl transition">
          <PlayCircle className="w-16 h-16 mb-4" />
          <h2 className="text-xl font-bold mb-3">Join a New Quiz</h2>
          <p className="opacity-90 mb-4">
            Enter the code from your teacher to start.
          </p>
          <button
            onClick={() => setShowJoinModal(true)}
            className="bg-white text-[#1d4e89] font-bold px-6 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            Join
          </button>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-[#1d4e89]">
            How to Take a Quiz
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Find a live quiz below or get a code from your teacher.</li>
            <li>Click 'Join' and enter the code.</li>
            <li>The quiz will start in full-screen mode.</li>
            <li>Answer all questions before the timer ends!</li>
          </ol>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center text-[#1d4e89] mb-6">
          Live Quizzes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {liveQuizzes.length > 0 ? (
            liveQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <h3 className="text-lg font-bold">{quiz.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Class: {quiz.class_group}
                </p>
                <p className="text-gray-500 text-sm flex-grow mb-4">
                  Topic: {quiz.topic}
                </p>
                <button
                  onClick={() => setQuizToAttempt(quiz)}
                  className="mt-auto w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Start Quiz
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              No live quizzes available right now. Check back soon!
            </p>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center text-[#1d4e89] mb-6 mt-10">
          Previous Quizzes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {performance.length > 0 ? (
            performance.map((perf) => (
              <div
                key={perf.attempt_id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <h3 className="text-lg font-bold">{perf.title}</h3>
                <p className="text-gray-500 text-sm mb-2">
                  Completed on:{" "}
                  {new Date(perf.submitted_at).toLocaleDateString()}
                </p>
                <p className="text-green-600 font-bold text-lg flex-grow mb-4">
                  Score: {perf.score} / {perf.total_questions}
                </p>
                <button
                  onClick={() => handleViewResult(perf.attempt_id)}
                  className="mt-auto w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
                >
                  <Eye size={18} /> View Result
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              You haven't attempted any quizzes yet.
            </p>
          )}
        </div>
      </div>

      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 relative">
            <button
              onClick={() => setShowJoinModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              <X />
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">
              Enter Quiz Code
            </h2>
            <div className="flex justify-center gap-3 mb-6">
              {quizCode.map((val, idx) => (
                <input
                  key={idx}
                  id={`code-${idx}`}
                  type="text"
                  value={val}
                  onChange={(e) => handleInputChange(e, idx)}
                  className="w-12 h-12 text-center border rounded-lg text-lg uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={1}
                />
              ))}
            </div>
            <button
              onClick={handleSubmitCode}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Join Quiz
            </button>
          </div>
        </div>
      )}

      {quizToAttempt && user && (
        <AttemptQuizModal
          quiz={quizToAttempt}
          studentName={user.name}
          onQuizEnd={handleQuizEnd}
        />
      )}
      {quizResults && (
        <QuizResultsModal
          results={quizResults}
          onClose={() => setQuizResults(null)}
        />
      )}
      {attemptDetails && (
        <DetailedResultsModal
          attemptDetails={attemptDetails}
          onClose={() => setAttemptDetails(null)}
        />
      )}
    </div>
  );
}

export default Students;
