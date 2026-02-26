import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTrip } from "../context/TripContext.jsx";

const links = [
  { to: "/dashboard", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/dashboard", label: "Dashboard" },
  // individual dashboard sections for quick navigation
  { to: "/dashboard#summary", label: "Summary" },
  { to: "/dashboard#map", label: "Route Map" },
  { to: "/dashboard#soc-chart", label: "SoC Curve" },
  { to: "/dashboard#energy-chart", label: "Energy Chart" },
  { to: "/dashboard#trip-breakdown", label: "Trip Breakdown" },
  { to: "/dashboard#cost-breakdown", label: "Cost Breakdown" },
  { to: "/dashboard#sensitivity", label: "Sensitivity Analysis" },
  { to: "/dashboard#stops", label: "Charging Stops" },
  { to: "/planner", label: "Route Planner" },
  { to: "/stations", label: "Stations" },
  { to: "/map", label: "Live Map" },
];

export default function Sidebar({ open, onClose }) {
  const { setPlanResult } = useTrip();
  const navigate = useNavigate();

  function handleNew() {
    setPlanResult(null);
    navigate("/");
    onClose();
  }

  return (
    <>
      {/* overlay - mobile drawer backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-lg transition-opacity duration-300 ease-in-out lg:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        role="presentation"
      />

      {/* sliding panel - mobile drawer */}
      <motion.div
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: open ? 0 : -300, opacity: open ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 bottom-0 z-40 w-64 bg-brand-primary text-brand-text p-6 space-y-6 lg:relative lg:z-0 lg:translate-x-0 lg:w-auto shadow-lg md:shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold">VoltPath</div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-brand.secondary/70 lg:hidden"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="space-y-3">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg hover:bg-brand.secondary/70 transition-colors duration-150 ${
                  isActive ? "bg-brand-primary/20 text-brand-text" : "text-brand-text"
                }`
              }
              onClick={onClose}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8">
          <button
            onClick={handleNew}
            className="w-full text-left px-4 py-2 rounded-lg bg-brand-primary/20 hover:bg-brand-primary/30 transition-colors text-sm text-brand-text"
          >
            New Plan
          </button>
        </div>
      </motion.div>
    </>
  );
}
