import React from "react";
import { motion } from "framer-motion";
import { useTrip } from "../context/TripContext.jsx";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"

export default function Navbar({ onMenuClick }) {
  const { setPlanResult } = useTrip();
  const navigate = useNavigate();

  function handleNew() {
    setPlanResult(null);
    navigate("/");
  }

  return (
    <div className="sticky top-0 z-40 bg-brand-primary border-b border-brand-secondary">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-brand-secondary/70 lg:hidden"
          aria-label="Open menu"
        >
          {/* simple burger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 6h18M3 12h18M3 18h18"
            />
          </svg>
        </button>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <div className="h-10 w-10 rounded-2xl">
            <img src={Logo} alt="logo" />
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight text-brand-light">VoltPath</div>
            <div className="text-xs text-brand-light/80">EV Route & Charging Planner</div>
          </div>
        </motion.div>
        <div className="hidden lg:block">
          <button
            onClick={handleNew}
            className="ml-4 px-3 py-1 rounded-lg bg-brand-secondary text-brand-light text-sm hover:bg-brand-secondary/80"
          >
            New Plan
          </button>
        </div>
      </div>
    </div>
  );
}