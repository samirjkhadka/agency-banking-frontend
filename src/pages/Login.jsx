import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "", token: "" });
  const navigate = useNavigate();


  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/agent/login", form);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-4">Agent Login</h2>
        {error && (
          <div className="mb-4 p-2 text-sm bg-red-100 text-red-600 rounded text-center uppercase">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 ">
          <div className="">
            <label htmlFor="" className="block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              className="mt-1 block w-full p-2 border rounded-xl"
              onChange={handleChange}
              value={form.email}
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div className="">
            <label htmlFor="" className="block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              className="mt-1 block w-full p-2 border rounded-xl"
              onChange={handleChange}
              value={form.password}
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <div className="">
            <label htmlFor="" className="block text-sm font-medium">
              OTP (Google Authenticator)
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border rounded-xl"
              onChange={handleChange}
              value={form.token}
              placeholder="123456"
              name="token"
              required
            />
          </div>

          
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
