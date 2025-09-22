import axios from "axios";

const API_BASE = "http://localhost:5000/api"; // Change if your backend runs elsewhere

export const signupUser = async ({
  role,
  name,
  email,
  password,
  class: studentClass,
}) => {
  try {
    if (role === "teacher") {
      const response = await axios.post(`${API_BASE}/auth/teacher/signup`, {
        name,
        email,
        password,
      });
      return response.data;
    } else if (role === "student") {
      const response = await axios.post(`${API_BASE}/auth/student/signup`, {
        name,
        email,
        password,
        class: studentClass || null,
      });
      return response.data;
    } else {
      throw new Error("Invalid role selected");
    }
  } catch (err) {
    throw err.response?.data || err;
  }
};

export const loginUser = async ({ role, email, password }) => {
  try {
    if (role === "teacher") {
      const response = await axios.post(`${API_BASE}/auth/teacher/login`, {
        email,
        password,
      });
      return response.data;
    } else if (role === "student") {
      const response = await axios.post(`${API_BASE}/auth/student/login`, {
        email,
        password,
      });
      return response.data;
    } else {
      throw new Error("Invalid role selected");
    }
  } catch (err) {
    throw err.response?.data || err;
  }
};
