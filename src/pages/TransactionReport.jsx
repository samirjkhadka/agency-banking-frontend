import React, { useState } from "react";
import api from "../utils/api";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

const TransactionReport = () => {
  const [filters, setFilters] = useState({
    from: "",
    to: "",
    type: "",
    customer_id: "",
    agent_id: "",
  });
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const params = Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v)
      );
      const res = await api.get("/reports/transactions", {
        headers: { Authorization: `Bearer ${token}` },
        params,
      });
      setTransactions(res.data.transactions);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTransactions();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Transaction Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Id", "Type", "Amount", "Customer Id", "Date", "Bill Type"]],
      body: transactions.map((transactions) => [
        transactions.id,
        transactions.type,
        transactions.amount,
        transactions.customer_id,
        transactions.timestamp,
        transactions.bill_type,
      ]),
    });
    doc.save("Transaction_report.pdf");
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Transaction Report</h2>

      {/* Filter Form */}
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-3 gap-4 bg-white p-4 shadow rounded-lg"
      >
        <input
          type="date"
          name="from"
          value={filters.from}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="From Date"
        />
        <input
          type="date"
          name="to"
          value={filters.to}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="To Date"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleChange}
          className="border rounded px-2 py-1"
        >
          <option value="">All Types</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="bill_payment">Bill Payment</option>
        </select>
        <input
          type="text"
          name="customer_id"
          value={filters.customer_id}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Customer ID"
        />
        <input
          type="text"
          name="agent_id"
          value={filters.agent_id}
          onChange={handleChange}
          className="border rounded px-2 py-1"
          placeholder="Agent ID"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
        >
          Filter
        </button>
      </form>
      <div className="flex gap-2">
        <CSVLink
          data={transactions}
          filename="agent_report.csv"
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Export CSV
        </CSVLink>
        <button
          onClick={exportPDF}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Export PDF
        </button>
      </div>
      {/* Table */}
      <div className="mt-6 bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Agent</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Bill Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="px-4 py-2">
                    {new Date(t.timestamp).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{t.agent_id}</td>
                  <td className="px-4 py-2">{t.customer_id}</td>
                  <td className="px-4 py-2 capitalize">{t.type}</td>
                  <td className="px-4 py-2">NPR {t.amount}</td>
                  <td className="px-4 py-2">{t.bill_type || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 text-center" colSpan="6">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionReport;
