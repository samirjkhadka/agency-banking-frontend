import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const BillPayment = () => {
  const [customers, setCustomers] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: "",
    amount: "",
    bill_type: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const res = await api.get("/customer");
    setCustomers(res.data.customers);
  };
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("/transactions/bill-payment", formData);
      setMessage(res.data.message);
      const transactionId = res.data?.transaction?.id;

      navigate(`/receipt/${transactionId}`);
      setFormData({
        customer_id: "",
        amount: "",
        bill_type: "",
      });
    
    } catch (err) {
      console.error("Payment error: ", err);
      setMessage(err.response.data.message || "Payment failed");
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Bill Payment</h2>
      <form action="" onSubmit={handleSubmit} className="space-y-4">
        <select
          name="customer_id"
          id=""
          value={formData.customer_id}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        >
          <option value="" className="">
            Select Customer
          </option>
          {customers.map((c) => (
            <option key={c.id} value={c.id} className="">
              {c.full_name}
            </option>
          ))}
        </select>

        <select
          name="bill_type"
          value={formData.bill_type}
          id=""
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="" className="">
            Select Bill Type
          </option>
          <option value="electricity" className="">
            Electricity
          </option>
          <option value="internet" className="">
            Internet
          </option>
          <option value="water" className="">
            Water
          </option>
          <option value="cable" className="">
            Cable Tv
          </option>
        </select>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="w-full p-2 border rounded"
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          type="submit"
        >
          Pay Bill
        </button>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      </form>
    </div>
  );
};

export default BillPayment;
