import React from "react";
import { motion } from "framer-motion";
import RouteForm from "../components/RouteForm.jsx";

export default function RoutePlannerPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 md:px-16 py-12
                    bg-gradient-to-br from-slate-900 via-slate-950 to-black">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl w-full">

        {/* LEFT SIDE — BRAND + STORY */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-6 text-center lg:text-left"
        >
          {/* Brand Name */}
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-white">Volt</span>
            <span className="text-orange-400">Path</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl text-white/70">
            Intelligent EV Route & Charging Optimization
          </p>

          {/* Description */}
          <p className="text-white/60 max-w-lg">
            VoltPath helps electric vehicle drivers plan smarter journeys with
            optimized charging stops, energy prediction, and real-world driving
            simulations.
          </p>

         
          

          {/* EV Image */}
          
          <img
            src="/ev-hero.png"
            alt="VoltPath EV"
            className="w-full max-w-lg mx-auto lg:mx-0 drop-shadow-2xl mt-6"
          />

           {/* Feature Chips */}

          <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
            <span className="px-4 py-2 text-sm bg-orange-500/20 border border-orange-400/30 rounded-full">
              ⚡ Smart Charging
            </span>
            <span className="px-4 py-2 text-sm bg-orange-500/20 border border-orange-400/30 rounded-full">
              🌦 Weather Impact
            </span>
            <span className="px-4 py-2 text-sm bg-orange-500/20 border border-orange-400/30 rounded-full">
              🚦 Traffic Prediction
            </span>
            <span className="px-4 py-2 text-sm bg-orange-500/20 border border-orange-400/30 rounded-full">
              🔋 Battery Health
            </span>
          </div>
        </motion.div>

        {/* RIGHT SIDE — FORM PANEL */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative bg-white/10 backdrop-blur-xl border border-white/10
                     rounded-3xl p-8 md:p-10 shadow-2xl overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-500/30 rounded-full blur-3xl" />

          <h2 className="text-3xl font-bold mb-2 text-center">
            Plan Your Journey
          </h2>

          <p className="text-white/60 text-sm text-center mb-6">
            Generate optimized EV routes with intelligent charging stops
          </p>

          <RouteForm />
        </motion.div>

      </div>
    </div>
  );
}