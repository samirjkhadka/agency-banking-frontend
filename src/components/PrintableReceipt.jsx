// src/components/PrintableReceipt.jsx
import React, { forwardRef } from "react";

const PrintableReceipt = forwardRef((props, ref) => (
  <div ref={ref} className="p-4 bg-white text-black">
    <h1 className="text-xl font-bold">Transaction Receipt</h1>
    <p>Customer: John Doe</p>
    <p>Amount: $100</p>
    <p>Status: Paid</p>
  </div>
));

export default PrintableReceipt;
