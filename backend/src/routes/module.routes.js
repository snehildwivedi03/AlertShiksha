const express = require("express");
const {
  getModules,
  getModuleById,
  createModule,
  updateModule,
  deleteModule,
} = require("../controllers/module.controller");

const { verifyToken, isTeacher } = require("../middlewares/auth.middleware");

const router = express.Router();

// Public routes for students
router.get("/", getModules);
router.get("/:id", getModuleById);

// Teacher-only routes
router.post("/", verifyToken, isTeacher, createModule);
router.put("/:id", verifyToken, isTeacher, updateModule);
router.delete("/:id", verifyToken, isTeacher, deleteModule);

module.exports = router;
