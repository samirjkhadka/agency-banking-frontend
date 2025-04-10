import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TwoFA = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/verify-2fa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token, userId: state.userId }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed: Invalid 2FA");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        action=""
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Enter 2FA Code</h2>
        <input
          type="text"
          placeholder="123456"
          className="mb-3 p-2 w-full border"
          onChange={(e) => setToken(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded w-full"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default TwoFA;
