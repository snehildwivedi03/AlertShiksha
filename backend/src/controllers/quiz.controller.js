require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the main GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const generateQuiz = async (req, res) => {
  try {
    const { topic, classGroup, questionType } = req.body;

    if (!topic || !classGroup) {
      return res
        .status(400)
        .json({ error: "topic and classGroup are required" });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate 5 ${
      questionType || "MCQ and True/False"
    } questions on "${topic}" for class ${classGroup}. Provide a clear separation for each question and its answer. Format the entire output as a single block of text.`;

    // Generate content using the new method
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      quiz: text,
    });
  } catch (err) {
    console.error("Error generating quiz:", err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
};

module.exports = { generateQuiz };
