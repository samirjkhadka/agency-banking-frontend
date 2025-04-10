import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      //   if (!token) return navigate("/");
      //   const res = await fetch("http://localhost:5000/api/transactions", {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   });
      //   const data = await res.json();
      //   setTransactions(data.transactions || []);
    };
    fetchData();
  }, [navigate]);
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Agent Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/");
          }}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Transactions" value={transactions.length} />
        <Card
          title="Total Volume"
          value={`NPR ${transactions
            .reduce((sum, tx) => sum + tx.amount, 0)
            .toLocaleString()}`}
        />
        <Card
          title="Todays Count"
          value={transactions.filter((tx) => isToday(tx.date)).length}
        />
      </div>
      {/* Recent Transaction */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <table className="w-full text-left">
          <thead className="">
            <tr className="border-b">
              <th className="">Date</th>
              <th className="">Type</th>
              <th className="">Amount</th>
              <th className="">Customer</th>
            </tr>
          </thead>
          <tbody className="">
            {transactions.slice(0, 5).map((tx) => (
              <tr key={tx.id} className="border-b text-sm">
                <td className="">{new Date(tx.date).toDateString()}</td>
                <td className="">{tx.type}</td>
                <td className="">NPR {tx.amount}</td>
                <td className="">{tx.customerName} || 'N/A'</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow text-center">
    <p className="text-gray-500">{title}</p>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

const isToday = (date) => {
  const Today = new Date();
  const d = new Date(date);
  return d.toDateString() === Today.toDateString();
};

export default Dashboard;
