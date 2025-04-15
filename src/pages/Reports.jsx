// src/pages/TestPrintPage.jsx
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import PrintableReceipt from "../components/PrintableReceipt"; // <-- make sure path is correct

const TestPrintPage = () => {
  const componentRef = useRef();

  return (
    <div className="p-6">
      <ReactToPrint
        trigger={() => (
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Download PDF
          </button>
        )}
        content={() => componentRef.current}
      />
      <div className="mt-4">
        <PrintableReceipt ref={componentRef} />
      </div>
    </div>
  );
};

export default TestPrintPage;
