import { useEffect, useState } from "react";

import { format } from "date-fns";
import api from "../utils/api";


const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [agents, setAgents] = useState([]);
  const [filters, setFilters] = useState({
    agent: "",
    type: "",
    startDate: "",
    endDate: "",
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  const fetchAgents = async () => {
    try {
      const res = await api.get("/agent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAgents(res.data.agents || []);
    } catch (err) {
      console.log("Error fetching agents", err);
    }
  };

  const fetchTransactions = (async () => {
    try {
      const res = await api.get("/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactions(res.data.transactions || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.log("Error fetching transactions", error);
    }
  });

  useEffect(() => {
    fetchAgents();
    fetchTransactions();
  }, [fetchAgents, fetchTransactions, filters, page]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setPage(1);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 text-blue-700">
        Transactions
      </h2>
      {/* Filter Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <select
          name="agent"
          onChange={handleFilterChange}
          value={filters.agent}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="" className="">
            All Agents
          </option>
          {agents.map((agent) => (
            <option value={agent._id} key={agent._id} className="">
              {agent.email}
            </option>
          ))}
        </select>
        <select
          name="type"
          id=""
          value={filters.type}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        >
          <option value="" className="">
            All Types
          </option>
          <option value="deposit" className="">
            Deposit
          </option>
          <option value="withdrawal" className="">
            Withdrawal
          </option>
          <option value="transfer" className="">
            Transfer
          </option>
        </select>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleFilterChange}
          className="border border-gray-300 rounded px-3 py-2 w-full"
        />
        <button
          onClick={fetchTransactions}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Apply
        </button>
      </div>
      {/* Transactions Table */}
      <div className="overflow-x-auto rounded-md">
        <table className="w-full text-sm md:text-base table-auto border">
          <thead className="bg-blue-100 text-blue-700">
            <tr>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Agent</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr
                  key={txn._id}
                  className="border-t hover:bg-gray-50 transition-all"
                >
                  <td className="px-4 py-3">{txn.customer_name || "—"}</td>
                  <td className="px-4 py-3">{txn.agent_name || "—"}</td>
                  <td className="px-4 py-3 capitalize">{txn.type}</td>
                  <td className="px-4 py-3">
                    NPR {txn.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {format(new Date(txn.timestamp), "dd MMM yyyy, hh:mm a")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {page} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Transactions;
