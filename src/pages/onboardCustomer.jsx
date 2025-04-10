import { useState } from "react";

const OnboardCustomer = () => {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (photo) formData.append("photo", photo);

    const res = await fetch("http://localhost:5000/api/customers/onboard", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    const data = await res.json();
    alert(data.message || "Submission complete");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Onboard Customer (KYC)</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="fullName"
          placeholder="Full Name"
          className="p-2 border"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone Number"
          className="p-2 border"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="p-2 border"
          onChange={handleChange}
        />
        <input
          name="dob"
          type="date"
          className="p-2 border"
          onChange={handleChange}
          required
        />
     
        <select name="idType" className="p-2 border" onChange={handleChange}>
          <option value="">Select ID Type</option>
          <option value="National ID">National ID</option>
          <option value="Voter's Card">Voter's Card</option>
          <option value="Driver's License">Driver's License</option>
        </select>
        <input
          name="idNumber"
          placeholder="ID Number"
          className="p-2 border"
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Residential Address"
          className="p-2 border"
          onChange={handleChange}
          required
        />
       
        <input
          name="state"
          placeholder="State"
          className="p-2 border"
          onChange={handleChange}
        />

        <div>
          <label className="block mb-1">Passport Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Submit KYC
        </button>
      </form>
    </div>
  );
};

export default OnboardCustomer;
