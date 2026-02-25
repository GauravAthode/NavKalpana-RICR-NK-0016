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
    <div className="sticky top-0 z-40 bg-[#222831] border-b border-[#393E46] shadow-md backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-[#393E46]/70 transition-colors duration-150 lg:hidden"
          aria-label="Open menu"
        >
          {/* simple burger icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-white"
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
          className="flex items-center gap-3 animate-fade"
        >
          <div className="h-10 w-10 rounded-2xl overflow-hidden">
            <img src={Logo} alt="logo" />
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight text-white">VoltPath</div>
            <div className="text-xs text-white/80">EV Route & Charging Planner</div>
          </div>
        </motion.div>
        <div className="hidden lg:block">
          <button
            onClick={handleNew}
            className="ml-4 px-4 py-2 rounded-lg bg-[#393E46] text-white text-sm hover:bg-[#393E46]/80 transition-colors duration-150"
          >
            New Plan
          </button>
        </div>
      </div>
    </div>
  );
}