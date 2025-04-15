import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Overlay on mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-40 shadow transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-blue-700">Agent Portal</h2>
          <button onClick={() => setOpen(false)} className="md:hidden">
            <X size={24} />
          </button>
        </div>

        <nav className="px-4 py-4 space-y-2">
          <Link to="/dashboard" className="block text-gray-700 hover:text-blue-600">Dashboard</Link>
          <Link to="/onboard" className="block text-gray-700 hover:text-blue-600">Onboard Customer</Link>
          <Link to="/transactions" className="block text-gray-700 hover:text-blue-600">Transactions</Link>
          <Link to="/bill-payments" className="block text-gray-700 hover:text-blue-600">Bill Payments</Link>
          <Link to="/reports" className="block text-gray-700 hover:text-blue-600">Analytics</Link>
          <Link to="/testreports" className="block text-gray-700 hover:text-blue-600">Test Report</Link>
          <Link to="/agent-reports" className="block text-gray-700 hover:text-blue-600">Agent Report</Link>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
