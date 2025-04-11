// import React from "react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const [transactions, setTransactions] = useState([]);
//   const navigate = useNavigate();
//   const [data, setData] = useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       const token = localStorage.getItem("token");
//       // if (!token) return navigate("/");
//       const res = await fetch("http://localhost:5000/api/transactions", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       const data = await res.json();
//       setTransactions(data.transactions || []);
//     };
//     fetchData();
//   }, [navigate]);
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Agent Dashboard</h1>
//         <button
//           onClick={() => {
//             localStorage.removeItem("token");
//             navigate("/");
//           }}
//           className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
//         >
//           Logout
//         </button>
//       </div>
//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <Card title="Total Transactions" value={transactions.length} />
//         <Card
//           title="Total Volume"
//           value={`NPR ${transactions
//             .reduce((sum, tx) => sum + tx.amount, 0)
//             .toLocaleString()}`}
//         />
//         <Card
//           title="Todays Count"
//           value={transactions.filter((tx) => isToday(tx.date)).length}
//         />
//       </div>
//       {/* Recent Transaction */}
//       <div className="bg-white p-4 rounded shadow">
//         <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
//         <table className="w-full text-left">
//           <thead className="">
//             <tr className="border-b">
//               <th className="">Date</th>
//               <th className="">Type</th>
//               <th className="">Amount</th>
//               <th className="">Customer</th>
//             </tr>
//           </thead>
//           <tbody className="">
//             {transactions.slice(0, 5).map((tx) => (
//               <tr key={tx.id} className="border-b text-sm">
//                 <td className="">{new Date(tx.date).toDateString()}</td>
//                 <td className="">{tx.type}</td>
//                 <td className="">NPR {tx.amount}</td>
//                 <td className="">{tx.customerName || "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// const Card = ({ title, value }) => (
//   <div className="bg-white p-4 rounded shadow text-center">
//     <p className="text-gray-500">{title}</p>
//     <p className="text-xl font-bold">{value}</p>
//   </div>
// );

// const isToday = (date) => {
//   const Today = new Date();
//   const d = new Date(date);
//   return d.toDateString() === Today.toDateString();
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await api.get("/analytics/agent-summary");
      setSummary(res1.data.summary);

      const res2 = await api.get("/analytics/daily-transactions");
      setDailyData(res2.data);
    };

    fetchData();
  }, []);

  const chartData = {
    labels: dailyData.map((d) => d.date),
    datasets: [
      {
        label: "Total Amount",
        data: dailyData.map((d) => d.amount),
        fill: false,
        borderColor: "#3b82f6",
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow text-center">
          <p className="text-sm text-gray-500">Customers</p>
          <h3 className="text-2xl font-bold">{summary.total_customers || 0}</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow text-center">
          <p className="text-sm text-gray-500">Transactions</p>
          <h3 className="text-2xl font-bold">{summary.total_transactions || 0}</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow text-center">
          <p className="text-sm text-gray-500">Total Value</p>
          <h3 className="text-2xl font-bold">NPR {summary.total_amount?.toLocaleString() || "0"}</h3>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow text-center">
          <p className="text-sm text-gray-500">Loans Disbursed</p>
          <h3 className="text-2xl font-bold">{summary.loans_disbursed || 0}</h3>
        </div>
      </div>

      {/* Daily Transactions Line Chart */}
      <div className="bg-white p-6 rounded-2xl shadow">
        <h4 className="text-lg font-semibold mb-4">Daily Transactions (NPR Amount)</h4>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Dashboard;
