const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");

// Teacher Signup
exports.teacherSignup = async (req, res) => {
  try {
    const { name, email, password, subject } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const [existing] = await pool.query(
      "SELECT * FROM teachers WHERE email = ?",
      [email]
    );
    if (existing.length > 0)
      return res.status(409).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO teachers (name, email, password_hash, subject) VALUES (?, ?, ?, ?)",
      [name, email, hash, subject || null]
    );

    res.status(201).json({ message: "Teacher registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Teacher Login
exports.teacherLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM teachers WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const teacher = rows[0];
    const valid = await bcrypt.compare(password, teacher.password_hash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: teacher.id, role: "teacher" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Student Signup
exports.studentSignup = async (req, res) => {
  try {
    const { name, email, password, class: studentClass } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const [existing] = await pool.query(
      "SELECT * FROM students WHERE email = ?",
      [email]
    );
    if (existing.length > 0)
      return res.status(409).json({ message: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO students (name, email, password_hash, class) VALUES (?, ?, ?, ?)",
      [name, email, hash, studentClass || null]
    );

    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Student Login
exports.studentLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM students WHERE email = ?", [
      email,
    ]);
    if (rows.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    const student = rows[0];
    const valid = await bcrypt.compare(password, student.password_hash);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: student.id, role: "student" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
