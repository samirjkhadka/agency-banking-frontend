import { useState } from "react";

const RegisterAgent = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [qrUrl, setQrUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await response.json();
    setLoading(false);
    if (data.qrImageUrl) {
      setQrUrl(data.qrImageUrl);
    } else {
      alert(data.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow-rounded">
      <h2 className="text-cl font-bold mb-4">Register Agent</h2>
      <form action="" className="grid gap-4" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          className="p-2 border rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {qrUrl && (
        <div className="mt-6 text-center">
          <p className="mb-2 font-medium">
            Scan this QR Code in Google Authenticator
          </p>
          <img src={qrUrl} alt="2FA QR Code" className="mx-auto w-48 h-48" />
        </div>
      )}
    </div>
  );
};

export default RegisterAgent;
