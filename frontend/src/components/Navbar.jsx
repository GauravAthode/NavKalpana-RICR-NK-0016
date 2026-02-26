import React from "react";
import { motion } from "framer-motion";
import { useTrip } from "../context/TripContext.jsx";
import { useNavigate, NavLink } from "react-router-dom";
import Logo from "../assets/logo.png"

export default function Navbar({ onMenuClick }) {
  const { setPlanResult } = useTrip();
  const navigate = useNavigate();

  function handleNew() {
    setPlanResult(null);
    navigate("/");
  }

  return (
    <div className="sticky top-1 z-50 bg-brand-primary border-b border-brand-secondary shadow-lg backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between h-16">
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
            <div className="text-lg font-semibold leading-tight text-white">
              VoltPath
            </div>
            <div className="text-xs text-white/80">
              EV Route & Charging Planner
            </div>
          </div>
        </motion.div>

        {/* right side actions */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/dashboard"
            className="px-3 py-2 rounded-lg text-brand-text text-sm hover:bg-brand-accent/20 transition-colors duration-150"
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="px-3 py-2 rounded-lg text-brand-text text-sm hover:bg-brand-accent/20 transition-colors duration-150"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className="px-3 py-2 rounded-lg text-brand-text text-sm hover:bg-brand-accent/20 transition-colors duration-150"
          >
            Contact
          </NavLink>
          <button
            onClick={handleNew}
            className="px-4 py-2 rounded-lg bg-brand-accent text-brand-primary text-sm hover:bg-brand-accent-hover transition-colors duration-150"
          >
            New Plan
          </button>
        </div>

        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-brand-secondary/70 transition-colors duration-150 md:hidden"
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