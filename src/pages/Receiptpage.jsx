import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import { useReactToPrint } from "react-to-print";

const ReceiptPage = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    fetchTransaction();
  }, []);

  const fetchTransaction = async () => {
    try {
      const res = await api.get(`/transactions/${id}`);

      setTransaction(res.data.transaction);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    
    documentTitle: `receipt-${id}`,
    removeAfterPrint: true,
    
  });
  console.log(componentRef.current)

  if (!transaction) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div ref={componentRef} className="border p-6 rounded bg-white shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Payment Receipt</h2>

        <div className="space-y-2 text-sm">
          <p>
            <strong>Transaction ID:</strong> {transaction.id}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(transaction.created_at).toLocaleString()}
          </p>
          <p>
            <strong>Customer ID:</strong> {transaction.customer_id}
          </p>
          <p>
            <strong>Agent ID:</strong> {transaction.agent_id}
          </p>
          <p>
            <strong>Type:</strong> {transaction.type}
          </p>
          {transaction.bill_type && (
            <p>
              <strong>Bill Type:</strong> {transaction.bill_type}
            </p>
          )}
          <p>
            <strong>Amount:</strong> NPR {transaction.amount}
          </p>
        </div>
      </div>

      <button
        onClick={() => setTimeout(handlePrint, 100)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Download PDF
      </button>
    </div>
  );
};

export default ReceiptPage;
