import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png"

export default function Navbar({ onMenuClick }) {
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-50 w-full bg-linear-to-r from-[#0f172a]/90 via-[#1f2937]/90 to-[#0f172a]/90 backdrop-blur-lg border-b border-white/10 shadow-lg">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto px-6">
        {/* brand/logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 animate-fade"
        >
          <div className="h-15 w-15 rounded-2xl overflow-hidden">
            <img src={Logo} alt="logo" />
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight bg-clip-text text-transparent bg-linear-to-r from-orange-400 via-yellow-300 to-orange-400">
              VoltPath
            </div>
            <div className="text-xs text-white/80">
              EV Route & Charging Planner
            </div>
          </div>
        </motion.div>


        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-brand-secondary/70 transition-colors duration-150 lg:hidden"
          aria-label="Toggle menu"
        >
          {/* burger icon */}
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
      </div>
    </div>
  );
}