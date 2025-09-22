import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import Loader from "../components/Loader";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) return alert("Please select a role before proceeding.");

    setLoading(true);
    try {
      const response = await loginUser({ email, password, role });
      console.log("Login successful:", response);
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message || "Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      {loading && <Loader />}
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2 text-center">
          Welcome Back! Login as
        </h3>
        <div className="flex space-x-4 mb-6">
          <button
            type="button"
            onClick={() => setRole("student")}
            className={`flex-1 py-2 rounded-md border ${
              role === "student"
                ? "bg-[#20538c] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Student
          </button>
          <button
            type="button"
            onClick={() => setRole("teacher")}
            className={`flex-1 py-2 rounded-md border ${
              role === "teacher"
                ? "bg-[#20538c] text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Teacher
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#20538c]"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#20538c]"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#20538c] hover:bg-[#2f6bb2] text-white rounded-md transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[#20538c] font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <p className="text-sm text-gray-600 text-center mt-2">
          <Link to="/" className="text-[#20538c] font-medium hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
