import React, { useState } from "react";
import api from "../utils/api";

const OnboardCustomer = () => {
  const [form, setForm] = useState({
    fullName: "",
    // gender: "",
    dob: "",
    address: "",
    phone: "",
    idType: "",
    id_Number: "",
    id_document_base64: null,
    photo_base64: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await api.post("/customer/onboard", form);
      setSuccess(true);
      setForm({
        fullName: "",
phone:"",
        dob: "",
        address: "",
        idNumber: "",
        idType: "",
        id_document_base64: null,
        photo_base64: null,
      });
    } catch (err) {
      console.error("Onboarding failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-md max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">
        Customer Onboarding (KYC)
      </h2>

      {success && (
        <div className="mb-4 p-3 rounded-md bg-green-100 text-green-700 border border-green-300">
          ✅ Customer onboarded successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Full Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* pHone number */}
        <div>
          <label className="text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* DOB */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* ID Type */}
        <div>
          <label className="text-sm font-medium text-gray-700">ID Type</label>
          <select
            name="idType"
            value={form.idType}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select ID Type</option>
            <option value="voter">Voter’s Card</option>
            <option value="driver">Driver’s License</option>
            <option value="national">National ID</option>
          </select>
        </div>
        {/* Id No */}
        <div>
          <label className="text-sm font-medium text-gray-700">Id No</label>
          <input
            type="text"
            name="idNumber"
            value={form.idNumber}
            onChange={handleChange}
            required
            className="mt-1 w-full rounded-xl border-gray-300 shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* ID Image */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Upload ID Image
          </label>
          <input
            type="file"
            name="id_document_base64"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 w-full text-sm text-gray-700"
          />
        </div>

        {/* Customer Photo */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Upload Customer Photo
          </label>
          <input
            type="file"
            name="photo_base64"
            accept="image/*"
            onChange={handleChange}
            required
            className="mt-1 w-full text-sm text-gray-700"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition duration-200"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardCustomer;
