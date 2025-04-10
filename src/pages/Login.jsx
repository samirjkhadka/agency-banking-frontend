import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    if (data.userId) {
      setUserId(data.id);
      navigate("/2fa", { state: { userId: data.userId } });
    } else {
      alert(data.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Agent Login</h2>
        <input
          type="email"
          className="mb-3 p-2 w-full border"
          onChange={handleChange}
          placeholder="Email"
          name="email"
        />
        <input
          type="password"
          className="mb-3 p-2 w-full border"
          onChange={handleChange}
          placeholder="Password"
          name="password"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
