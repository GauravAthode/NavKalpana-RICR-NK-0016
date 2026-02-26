import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`flex h-screen bg-brand-primary text-brand-text relative ${
      sidebarOpen ? "overflow-hidden" : ""
    }`}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen((open) => !open)} />
        <main className="flex-1 overflow-auto p-6 animate-fade">{children}</main>
      </div>
    </div>
  );
}
