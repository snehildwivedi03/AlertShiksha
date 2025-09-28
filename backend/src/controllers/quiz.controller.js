const pool = require("../db");
const crypto = require("crypto");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

exports.generateQuiz = async (req, res) => {
  try {
    const { topic, classGroup, questionType } = req.body;
    if (!topic || !classGroup) {
      return res
        .status(400)
        .json({ error: "topic and classGroup are required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate 10 questions on "${topic}" for class ${classGroup}. 
    The questions should be of type ${questionType || "MCQ and True/False"}.
    Each question must strictly follow this JSON format:
    {
      "question": "string",
      "options": ["string","string","string","string"],
      "answer": "string"
    }`;

    const questionSchema = {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: {
            type: "array",
            items: { type: "string" },
            description: "An array of options for the question.",
          },
          answer: {
            type: "string",
            description: "The correct option from the list of options.",
          },
        },
        required: ["question", "options", "answer"],
      },
    };

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
      },
    });

    const text =
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

    if (!text) {
      return res
        .status(500)
        .json({ error: "AI did not return any content for questions" });
    }

    let questions;
    try {
      questions = JSON.parse(text);
    } catch (err) {
      console.error("Error parsing AI response:", text);
      return res
        .status(500)
        .json({ error: "AI returned invalid JSON for questions" });
    }

    const code = crypto.randomInt(1000, 9999).toString();

    const [rows] = await pool.query(
      `INSERT INTO quizzes (code, title, topic, class_group, questions, created_by, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        code,
        `${topic} Quiz`,
        topic,
        classGroup,
        JSON.stringify(questions),
        req.user.id,
        "live",
      ]
    );

    res.json({
      success: true,
      quizId: rows.insertId,
      code,
      quiz: questions,
    });
  } catch (err) {
    console.error("Error generating quiz:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};

exports.getQuizByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const [rows] = await pool.query(
      "SELECT id, code, title, topic, class_group, questions FROM quizzes WHERE code = ? AND status = 'live'",
      [code]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Quiz not found or not live" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching quiz:", err);
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
};

exports.submitQuiz = async (req, res) => {
  try {
    const { code } = req.params;
    const studentId = req.user.id;
    const { studentName, answers } = req.body;

    const [quizRows] = await pool.query(
      "SELECT id, questions FROM quizzes WHERE code = ? AND status = 'live'",
      [code]
    );
    if (!quizRows.length) {
      return res.status(404).json({ error: "Quiz not found or not live" });
    }

    const quiz = quizRows[0];
    const questions = quiz.questions;
    let score = 0;

    questions.forEach((q, i) => {
      if (answers[i] && answers[i].selected === q.answer) {
        score++;
      }
    });

    await pool.query(
      `INSERT INTO quiz_attempts 
   (quiz_id, student_id, student_name, answers, score, total, total_questions)
   VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        quiz.id,
        studentId,
        studentName,
        JSON.stringify(answers),
        score,
        questions.length,
        questions.length,
      ]
    );

    res.json({
      success: true,
      score,
      total: questions.length,
    });
  } catch (err) {
    console.error("Error submitting quiz:", err);
    res.status(500).json({ error: "Failed to submit quiz" });
  }
};

exports.getTeacherQuizzes = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const [rows] = await pool.query(
      "SELECT id, code, title, topic, class_group, questions, status, created_at FROM quizzes WHERE created_by = ? ORDER BY created_at DESC",
      [teacherId]
    );
    const quizzes = rows.map((q) => ({
      ...q,
      created_at: new Date(q.created_at).toISOString(),
    }));
    res.json({
      live: quizzes.filter((q) => q.status === "live"),
      previous: quizzes.filter((q) => q.status !== "live"),
    });
  } catch (err) {
    console.error("Error fetching teacher quizzes:", err);
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
};

exports.endQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const teacherId = req.user.id;
    const [result] = await pool.query(
      "UPDATE quizzes SET status = 'closed' WHERE id = ? AND created_by = ?",
      [quizId, teacherId]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Quiz not found or you're not authorized." });
    }
    res.json({ success: true, message: "Quiz ended successfully." });
  } catch (err) {
    console.error("Error ending quiz:", err);
    res.status(500).json({ error: "Failed to end quiz" });
  }
};

exports.getAllLiveQuizzes = async (req, res) => {
  try {
    await pool.query(
      "UPDATE quizzes SET status = 'closed' WHERE status = 'live' AND created_at < NOW() - INTERVAL 10 MINUTE"
    );

    const [rows] = await pool.query(
      "SELECT id, code, title, topic, class_group, questions FROM quizzes WHERE status = 'live' ORDER BY created_at DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching live quizzes:", err);
    res.status(500).json({ error: "Failed to fetch live quizzes" });
  }
};

exports.getStudentPerformance = async (req, res) => {
  try {
    const studentId = req.user.id;
    const [rows] = await pool.query(
      `SELECT
         qa.id as attempt_id,
         q.title,
         qa.score,
         qa.total_questions,
         qa.submitted_at
       FROM quiz_attempts qa
       JOIN quizzes q ON qa.quiz_id = q.id
       WHERE qa.student_id = ?
       ORDER BY qa.submitted_at DESC`,
      [studentId]
    );
    res.json(rows);
  } catch (err) {
    console.error("Error fetching student performance:", err);
    res.status(500).json({ error: "Failed to fetch performance" });
  }
};

exports.getQuizAttemptDetails = async (req, res) => {
  try {
    const { attemptId } = req.params;
    const studentId = req.user.id;

    const [rows] = await pool.query(
      `SELECT
         qa.score,
         qa.total_questions,
         qa.answers AS student_answers,
         q.questions AS original_questions
       FROM quiz_attempts qa
       JOIN quizzes q ON qa.quiz_id = q.id
       WHERE qa.id = ? AND qa.student_id = ?`,
      [attemptId, studentId]
    );

    if (!rows.length) {
      return res
        .status(404)
        .json({ error: "Attempt not found or you are not authorized." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error fetching attempt details:", err);
    res.status(500).json({ error: "Failed to fetch attempt details" });
  }
};
