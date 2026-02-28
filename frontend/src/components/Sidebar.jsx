import React, { useEffect, useState } from "react";
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
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsLarge(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

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
        initial={isLarge ? { x: 0, opacity: 1 } : { x: -300, opacity: 0 }}
        animate={isLarge ? { x: 0, opacity: 1 } : { x: open ? 0 : -300, opacity: open ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 bottom-0 z-40 w-64 bg-brand-secondary/90 backdrop-blur-md text-brand-text p-6 flex flex-col space-y-6 shadow-xl transform transition-transform duration-300 ease-in-out
                   lg:w-72 lg:shadow-none lg:translate-x-0 lg:h-full lg:sticky lg:top-0"
      >
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold tracking-wide bg-clip-text text-transparent bg-linear-to-r from-orange-400 via-yellow-300 to-orange-400">VoltPath</div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-brand-secondary/70 lg:hidden"
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
        <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg hover:bg-brand-accent/20 transition-colors duration-150 text-sm font-medium ${
                  isActive
                    ? "bg-brand-accent/10 text-brand-accent border-l-4 border-accent"
                    : "text-brand-text"
                }`
              }
              onClick={onClose}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleNew}
            className="w-full text-left px-4 py-2 rounded-lg bg-brand-accent text-brand-primary font-semibold hover:bg-brand-accent-hover transition-colors shadow-sm"
          >
            New Plan
          </button>
        </div>
      </motion.div>
    </>
  );
}
