import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginAgent = () => {
  const [form, setForm] = useState({ email: "", password: "", token: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok && data.token) {
      localStorage.setItem("token", data.token);
      setMessage(data.message || "Login successful");
      navigate("/dashboard");
    } else {
      setMessage(data.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Agent Login</h2>
      <form action="" onSubmit={handleSubmit} className="grid gap-4">
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="password"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="token"
          required
          placeholder="2FA token"
          onChange={handleChange}
          className="p-2 border rounded"
        />
        <button
          className="bg-green-600 text-white py-2 px-4 rounded"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default LoginAgent;
