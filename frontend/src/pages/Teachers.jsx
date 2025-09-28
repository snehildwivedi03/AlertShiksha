import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // --- NEW: To handle redirects
import { useAuth } from "../context/AuthContext"; // --- NEW: Import the auth context hook
import QuizModal from "../components/QuizModal";
import DiscussionModal from "../components/DiscussionModal";
import profileImg from "../assets/profile.png";
import { PlusCircle, MessageSquareQuote, Eye, XCircle } from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader"; // --- NEW: To show while auth is checked

const Teachers = () => {
  // --- NEW: Get auth state and token from the context ---
  const { token, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [liveQuizzes, setLiveQuizzes] = useState([]);
  const [previousQuizzes, setPreviousQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [viewQuiz, setViewQuiz] = useState(null);
  const [discussQuiz, setDiscussQuiz] = useState(null);

  const [topic, setTopic] = useState("");
  const [institutionType, setInstitutionType] = useState("School");
  const [classGroup, setClassGroup] = useState("");

  const topStudents = [
    { name: "John Doe", class: "10A", rank: 1 },
    { name: "Jane Smith", class: "10B", rank: 2 },
    { name: "Michael Johnson", class: "10A", rank: 3 },
  ];

  const topics = [
    "Fire Safety",
    "Flood Preparedness",
    "Earthquake Safety",
    "General Knowledge",
  ];
  const classes = [
    "Nursery",
    "KG",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  // --- NEW: useEffect to protect the route ---
  useEffect(() => {
    // If the authentication status is confirmed and the user is not logged in, redirect them.
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  // --- UPDATED: This effect now depends on the token from the context ---
  useEffect(() => {
    const fetchQuizzes = async () => {
      // Only fetch data if the user is authenticated and we have a token.
      if (isAuthenticated && token) {
        try {
          const res = await axios.get(
            "http://localhost:5000/api/quizzes/teacher",
            {
              // --- FIX: Use token from context, not localStorage ---
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setLiveQuizzes(res.data.live || []);
          setPreviousQuizzes(res.data.previous || []);
        } catch (err) {
          console.error("Failed to fetch quizzes:", err);
          // If the token is invalid (403), the context will eventually log the user out.
        }
      }
    };
    fetchQuizzes();
  }, [isAuthenticated, token]); // Re-run when auth state changes

  // --- Auto-end quiz logic (no changes needed here) ---
  useEffect(() => {
    const QUIZ_DURATION_MS = 10 * 60 * 1000;
    const interval = setInterval(() => {
      const now = new Date();
      let quizzesToEnd = [];
      let activeQuizzes = [];
      liveQuizzes.forEach((quiz) => {
        const quizCreatedAt = new Date(quiz.created_at);
        if (now - quizCreatedAt > QUIZ_DURATION_MS) quizzesToEnd.push(quiz);
        else activeQuizzes.push(quiz);
      });
      if (quizzesToEnd.length > 0) {
        setLiveQuizzes(activeQuizzes);
        setPreviousQuizzes((prev) => [...quizzesToEnd, ...prev]);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [liveQuizzes]);

  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        topic,
        classGroup: institutionType === "School" ? classGroup : "College",
        questionType: "MCQ + True/False",
      };
      const res = await axios.post(
        "http://localhost:5000/api/quizzes/generate",
        payload,
        {
          // --- FIX: Use token from context ---
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const newQuiz = {
        ...res.data,
        topic,
        class_group: classGroup,
        status: "live",
        created_at: new Date().toISOString(),
      };
      setLiveQuizzes((prev) => [newQuiz, ...prev]);
      setShowModal(false);
      setTopic("");
      setClassGroup("");
    } catch (err) {
      console.error(err);
      alert("Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleEndQuiz = async (quizId) => {
    if (!window.confirm("Are you sure you want to end this quiz?")) return;
    try {
      await axios.put(
        `http://localhost:5000/api/quizzes/end/${quizId}`,
        {},
        {
          // --- FIX: Use token from context ---
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const quizToEnd = liveQuizzes.find((q) => q.id === quizId);
      if (quizToEnd) {
        setLiveQuizzes(liveQuizzes.filter((q) => q.id !== quizId));
        setPreviousQuizzes((prev) => [quizToEnd, ...prev]);
      }
    } catch (err) {
      console.error("Failed to end quiz:", err);
      alert("Could not end the quiz. Please try again.");
    }
  };

  // --- NEW: Show a loader while checking auth to prevent content flash ---
  if (!isAuthenticated) {
    return <Loader />;
  }

  return (
    <div className="p-6 space-y-10 bg-gray-50 min-h-screen">
      {/* Top Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4 text-[#1d4e89]">
            Steps to Create Quiz
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Click on "Create Quiz" button</li>
            <li>Select Topic and Institution type</li>
            <li>Select Class (if school)</li>
            <li>Click Generate Quiz to start</li>
          </ol>
        </div>
        <div
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-br from-[#1d4e89] to-[#2563eb] shadow-lg rounded-2xl p-6 flex flex-col justify-center items-center text-center text-white hover:shadow-2xl cursor-pointer transition"
        >
          <PlusCircle className="w-16 h-16 mb-4" />
          <h2 className="text-xl font-bold mb-2">Create Quiz</h2>
          <p className="opacity-90">Generate a quiz for your students.</p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-[#1d4e89] mb-4">
            Top Students
          </h2>
          <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
            {topStudents.map((student, index) => (
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
                    {student.name}
                  </span>
                </div>
                <div className="text-right text-sm">
                  <p className="font-semibold text-[#1d4e89]">
                    Class {student.class}
                  </p>
                  <p className="text-gray-500">Rank #{student.rank}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Quizzes Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Live Quizzes
        </h2>
        {liveQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-green-50 shadow-md rounded-2xl p-4 border-l-4 border-green-500 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {quiz.title || quiz.topic}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Class: {quiz.class_group}
                  </p>
                  <p className="text-gray-600 mb-4">
                    Code:{" "}
                    <span className="font-mono text-lg bg-gray-200 px-2 py-1 rounded">
                      {quiz.code}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col space-y-2 mt-auto">
                  <button
                    onClick={() => setViewQuiz(quiz)}
                    className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Eye size={18} /> View Quiz
                  </button>
                  <button
                    onClick={() => setDiscussQuiz(quiz)}
                    className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white px-3 py-2 rounded-lg hover:bg-indigo-700"
                  >
                    <MessageSquareQuote size={18} /> Discuss Quiz
                  </button>
                  <button
                    onClick={() => handleEndQuiz(quiz.id)}
                    className="flex items-center justify-center gap-2 w-full bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700"
                  >
                    <XCircle size={18} /> End Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700">
            No live quizzes found. Create one to get started!
          </p>
        )}
      </div>

      {/* Previous Quizzes Section */}
      <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-[#1d4e89] mb-6">
          Previous Quizzes
        </h2>
        {previousQuizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previousQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-gray-50 shadow-md rounded-2xl p-4 border flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    {quiz.title || quiz.topic}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Class: {quiz.class_group}
                  </p>
                  <p className="text-gray-600 mb-2">
                    Code: <span className="font-mono">{quiz.code}</span>
                  </p>
                </div>
                <div className="flex flex-col space-y-2 mt-4">
                  <button
                    onClick={() => setViewQuiz(quiz)}
                    className="flex items-center justify-center gap-2 w-full bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600"
                  >
                    <Eye size={18} /> View Quiz
                  </button>
                  <button
                    onClick={() => setDiscussQuiz(quiz)}
                    className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700"
                  >
                    <MessageSquareQuote size={18} /> Discuss Quiz
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-700">
            No previous quizzes available.
          </p>
        )}
      </div>

      {/* Generate Quiz Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md relative">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Generate Quiz
            </h2>
            <form onSubmit={handleGenerateQuiz} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Topic</option>
                  {topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 mb-1 font-medium">
                  Institution Type
                </label>
                <select
                  value={institutionType}
                  onChange={(e) => setInstitutionType(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="School">School</option>
                  <option value="College">College</option>
                </select>
              </div>
              {institutionType === "School" && (
                <div>
                  <label className="block text-gray-700 mb-1 font-medium">
                    Class
                  </label>
                  <select
                    value={classGroup}
                    onChange={(e) => setClassGroup(e.target.value)}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Class</option>
                    {classes.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 rounded-lg border font-semibold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Quiz"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewQuiz && (
        <QuizModal quiz={viewQuiz} onClose={() => setViewQuiz(null)} />
      )}
      {discussQuiz && (
        <DiscussionModal
          quiz={discussQuiz}
          onClose={() => setDiscussQuiz(null)}
        />
      )}
    </div>
  );
};

export default Teachers;
