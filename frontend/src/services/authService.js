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
    let response;
    if (role === "teacher") {
      response = await axios.post(`${API_BASE}/auth/teacher/login`, {
        email,
        password,
      });
    } else if (role === "student") {
      response = await axios.post(`${API_BASE}/auth/student/login`, {
        email,
        password,
      });
    } else {
      throw new Error("Invalid role selected");
    }

    // --- NEW: Re-structure the response to match what the AuthContext expects ---
    // This assumes your backend login response includes a 'token' and a 'user' object.
    // If your backend sends user data flat (e.g., name, email), we assemble it here.
    const { token, user } = response.data;

    if (!token || !user) {
      // If the structure is different, we create it.
      // This makes the frontend resilient even if the backend response changes slightly.
      const responseData = response.data;
      return {
        token: responseData.token,
        user: {
          id: responseData.user_id || responseData.id,
          name: responseData.name,
          email: responseData.email,
          role: responseData.role || role, // Use the role from the response, or fallback to the one sent.
        },
      };
    }

    return { token, user }; // Return in the expected { user, token } format
  } catch (err) {
    throw err.response?.data || err;
  }
};
