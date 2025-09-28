const express = require("express");
const { verifyToken, isTeacher } = require("../middlewares/auth.middleware");
const {
  generateQuiz,
  getQuizByCode,
  submitQuiz,
  getTeacherQuizzes,
  endQuiz,
  getAllLiveQuizzes,
  getStudentPerformance,
  getQuizAttemptDetails,
} = require("../controllers/quiz.controller");

const router = express.Router();

// --- TEACHER ROUTES ---
router.post("/generate", verifyToken, isTeacher, generateQuiz);
router.get("/teacher", verifyToken, isTeacher, getTeacherQuizzes);
router.put("/end/:quizId", verifyToken, isTeacher, endQuiz);

// --- STUDENT & GENERAL ROUTES ---
router.get("/join/:code", getQuizByCode);
router.post("/:code/submit", verifyToken, submitQuiz);
router.get("/live-quizzes", getAllLiveQuizzes);
router.get("/performance", verifyToken, getStudentPerformance);
router.get("/attempt/:attemptId", verifyToken, getQuizAttemptDetails);

module.exports = router;
