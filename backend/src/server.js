const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth.routes");
const moduleRoutes = require("./routes/module.routes");
const quizRoutes = require("./routes/quiz.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/quizzes", quizRoutes);

// Server start
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
