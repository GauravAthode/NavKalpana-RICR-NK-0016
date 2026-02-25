import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext.jsx";

const links = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/map", label: "Map View" },
  { to: "/stations", label: "Stations" },
  { to: "/planner", label: "Route Planner" },
  { to: "/settings", label: "Settings" },
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
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-lg transition-opacity duration-300 ease-in-out lg:hidden ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed left-0 top-0 bottom-0 w-64 bg-[#393E46] text-white p-6 space-y-6 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } animate-fade`}
      >
        <div className="text-xl font-bold">VoltPath</div>
        <nav className="space-y-2">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg hover:bg-[#393E46]/70 transition-colors ${
                  isActive ? "bg-[#222831]/20 text-white" : "text-white"
                }`
              }
              onClick={onClose}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-6">
          <button
            onClick={handleNew}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#393E46]/70 transition-colors text-sm text-white"
          >
            New Plan
          </button>
        </div>
      </div>
    </>
  );
}
