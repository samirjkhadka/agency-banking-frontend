// import {useState} from "react";
// import { Link, useLocation } from "react-router-dom";

// const navLinks = [
//   { name: "Dashboard", path: "/dashboard" },
//   { name: "Onboard Customer", path: "/onboard" },
//   { name: "Transactions", path: "/transactions" },
//   { name: "Reports", path: "/reports" },
// ];

// const Layout = () => {
//   // const location = useLocation();
//   // const [sideBarOpen, setSideBarOpen] = useState(false)
//   // return (
//   //   <div className="flex min-h-screen bg-gray-100">
//   //     {/* Sidebar */}

//   //     <aside className="w-64 bg-white p-4 shadow-md space-y-6">
//   //       <h2 className="text-xl font-bold text-blue-600">Agency Banking</h2>
//   //       <nav className="space-y-2">
//   //         {navLinks.map((link) => (
//   //           <Link
//   //             key={link.path}
//   //             to={link.path}
//   //             className={`block px-3 py-2 rounded-xl ${
//   //               location.pathname === link.path
//   //                 ? "bg-blue-600 text-white"
//   //                 : "text-gray-700 hover:bg-gray-100"
//   //             }`}
//   //           >
//   //             {link.name}
//   //           </Link>
//   //         ))}
//   //       </nav>
//   //       <div className="">
//   //         <button
//   //           className="text-red-600 text-sm hover:underline"
//   //           onClick={() => {
//   //             localStorage.removeItem("token");
//   //             window.location.href = "/";
//   //           }}
//   //         >
//   //           Logout
//   //         </button>
//   //       </div>
//   //     </aside>
//   //     <main className="flex-1 p-6">{children}</main>
//   //   </div>
//   // );


  
// };

// export default Layout;

import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-100 min-h-screen flex">
      {/* Sidebar */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col w-full md:ml-64">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-white shadow">
          <button onClick={() => setSidebarOpen(true)} className="text-blue-700">
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold text-blue-700">Agent Portal</h1>
          <button onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }} className="text-red-600 text-sm hover:underline">Logout</button>
        </div>

        {/* Actual page content */}
        <main className="p-4 md:p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

