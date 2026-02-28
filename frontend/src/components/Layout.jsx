import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import { useTrip } from "../context/TripContext.jsx";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { planResult } = useTrip();

  // keep sidebar visible by default on larger viewports and when a plan exists
  useEffect(() => {
    const check = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // if the user lands on dashboard after generating a route make sure the
  // navigation panel isn't collapsed on desktop
  useEffect(() => {
    if (planResult && window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, [planResult]);

  return (
    <div
      className={`flex h-screen bg-brand-primary text-brand-text relative ${
        sidebarOpen ? "overflow-hidden" : ""
      }`}
    >
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen((o) => !o)} />
        <main className="flex-1 overflow-auto p-6 max-w-7xl mx-auto w-full animate-fade">
          {children}
        </main>
      </div>
    </div>
  );
}
