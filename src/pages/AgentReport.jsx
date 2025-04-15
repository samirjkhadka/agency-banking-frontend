import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { CSVLink } from "react-csv";
import jsPDF from "jspdf";
import { autoTable } from "jspdf-autotable";

const AgentReport = () => {
  const [agents, setAgents] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  useEffect(() => {
    api
      .get("/agent")
      .then((res) => setAgents(res.data.agents))
      .catch((err) => console.error("Agent fetch error:", err));
  }, []);

  const fetchReport = async () => {
    try {
      const params = {
        agent_id: agentId,
        ...(dateRange.start && { start_date: dateRange.start }),
        ...(dateRange.end && { end_date: dateRange.end }),
      };

      const res = await api.get("/reports/agent-transactions", { params });
      setTransactions(res.data.transactions);
      setSummary(res.data.summary);
    } catch (err) {
      console.error("Report fetch error:", err);
    }
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Agent Report", 14, 20);
    autoTable(doc, {
      startY: 30,
      head: [["Id", "Type", "Amount", "Customer Id", "Date"]],
      body: transactions.map((transactions) => [
        transactions.id,
        transactions.type,
        transactions.amount,
        transactions.customer_id,
        transactions.timestamp
   
      ]),
    });
    doc.save("agent_report.pdf");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">
        Agent-Specific Transaction Report
      </h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          className="border p-2 rounded"
          value={agentId}
          onChange={(e) => setAgentId(e.target.value)}
        >
          <option value="">Select Agent</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent.id}>
              {agent.name || agent.email}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
        />

        <button
          onClick={fetchReport}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Get Report
        </button>
      </div>

      {transactions.length > 0 && (
        <div>
          <div className="flex justify-between mb-4">
            <div>
              <p>
                <strong>Total Transactions:</strong>{" "}
                {summary.total_transactions}
              </p>
              <p>
                <strong>Total Amount:</strong> {summary.total_amount}
              </p>
            </div>
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
          </div>

          <div className="overflow-auto">
            <table className="min-w-full bg-white shadow rounded">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-2">ID</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Amount (NPR)</th>
                  <th className="p-2">Customer ID</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b">
                    <td className="p-2">{tx.id}</td>
                    <td className="p-2">{tx.type}</td>
                    <td className="p-2">{tx.amount}</td>
                    <td className="p-2">{tx.customer_id}</td>
                    <td className="p-2">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentReport;
