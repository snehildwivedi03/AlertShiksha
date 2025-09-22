const express = require("express");
const {
  teacherSignup,
  teacherLogin,
  studentSignup,
  studentLogin,
} = require("../controllers/auth.controller");

const router = express.Router();

// Teacher
router.post("/teacher/signup", teacherSignup);
router.post("/teacher/login", teacherLogin);

// Student
router.post("/student/signup", studentSignup);
router.post("/student/login", studentLogin);

module.exports = router;
