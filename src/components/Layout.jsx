import React from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Onboard Customer", path: "/onboard" },
  { name: "Transactions", path: "/transactions" },
  { name: "Reports", path: "/reports" },
];

const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-4 shadow-md space-y-6">
        <h2 className="text-xl font-bold text-blue-600">Agency Banking</h2>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`block px-3 py-2 rounded-xl ${
                location.pathname === link.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="">
          <button
            className="text-red-600 text-sm hover:underline"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;
