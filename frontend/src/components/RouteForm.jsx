import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../config/ApiClient.js";
import { useTrip } from "../context/TripContext.jsx";

const defaultState = {
  start: "Bhopal, Madhya Pradesh",
  destination: "Indore, Madhya Pradesh",
  batteryCapacityKwh: 40,
  efficiencyKmPerKwh: 6.5,
  usableBatteryPercent: 90,
  minimumReserveSocPercent: 15,
  electricityRatePerKwh: 10,
  temperature: 25,
  wind: "none",
  hvac: false,
  traffic: "free",
};

export default function RouteForm() {
  const [form, setForm] = useState(defaultState);
  const navigate = useNavigate();
  const { setPlanResult, isPlanning, setIsPlanning, error, setError } = useTrip();

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setIsPlanning(true);
    setPlanResult(null);

    try {
      const payload = {
        start: String(form.start),
        destination: String(form.destination),
        vehicle: {
          batteryCapacityKwh: Number(form.batteryCapacityKwh),
          efficiencyKmPerKwh: Number(form.efficiencyKmPerKwh),
          usableBatteryPercent: Number(form.usableBatteryPercent),
          minimumReserveSocPercent: Number(form.minimumReserveSocPercent),
        },
        pricing: { electricityRatePerKwh: Number(form.electricityRatePerKwh) },
        weather: {
          temperature: Number(form.temperature || 25),
          wind: form.wind || "none",
          hvac: Boolean(form.hvac),
        },
        traffic: form.traffic || "free",
      };

      console.log("[SUBMIT] Sending payload:", payload);
      const { data } = await apiClient.post("/api/trips/plan", payload);
      console.log("[SUCCESS] Response:", data);
      
      if (!data) {
        throw new Error("Empty response from server");
      }
      if (!data.ok) {
        throw new Error(data.error || "Planning failed");
      }
      if (!data.route || !data.simulation) {
        console.warn("[WARNING] Response missing route or simulation:", data);
        throw new Error("Response incomplete: missing route or simulation data");
      }
      
      setPlanResult(data);
      console.log("[NAVIGATE] Redirecting to dashboard...");
      // Navigate after state is updated
      setTimeout(() => navigate("/dashboard"), 100);
    } catch (err) {
      console.error("[ERROR] Failed:", err);
      const errorMsg = 
        err?.response?.data?.error || 
        err?.message || 
        "Failed to generate route. Check browser console.";
      setError(errorMsg);
    } finally {
      setIsPlanning(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Column Layout */}
      <Input
        label="Start Location"
        name="start"
        value={form.start}
        onChange={onChange}
        placeholder="Enter start city (e.g. Bhopal)"
      />

      <Input
        label="Destination"
        name="destination"
        value={form.destination}
        onChange={onChange}
        placeholder="Enter destination (e.g. Indore)"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Battery Capacity (kWh)"
          name="batteryCapacityKwh"
          value={form.batteryCapacityKwh}
          onChange={onChange}
          type="number"
        />
        <Input
          label="Efficiency (km/kWh)"
          name="efficiencyKmPerKwh"
          value={form.efficiencyKmPerKwh}
          onChange={onChange}
          type="number"
          step="0.1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Usable Battery (%)"
          name="usableBatteryPercent"
          value={form.usableBatteryPercent}
          onChange={onChange}
          type="number"
        />
        <Input
          label="Reserve SoC (%)"
          name="minimumReserveSocPercent"
          value={form.minimumReserveSocPercent}
          onChange={onChange}
          type="number"
        />
      </div>

      <Input
        label="Electricity Rate (₹/kWh)"
        name="electricityRatePerKwh"
        value={form.electricityRatePerKwh}
        onChange={onChange}
        type="number"
      />

      {/* Weather & Traffic Section */}
      <div className="border-t border-white/10 pt-4 mt-4">
        <h3 className="text-sm font-semibold text-white/80 mb-4">Advanced Conditions</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Temperature (°C)"
            name="temperature"
            value={form.temperature}
            onChange={onChange}
            type="number"
          />
          <div className="space-y-2">
            <label className="text-sm text-white/75">Wind Condition</label>
            <select
              name="wind"
              value={form.wind}
              onChange={onChange}
              className="w-full h-14 rounded-2xl px-5 text-sm text-white/90
                         bg-slate-950/30 border border-white/10 backdrop-blur
                         outline-none transition-all duration-200
                         hover:border-orange-400/40 hover:bg-slate-950/40
                         focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400/60"
            >
              <option value="none">No Wind</option>
              <option value="head">Headwind (+5-20%)</option>
              <option value="tail">Tailwind (-3-10%)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="flex items-center space-x-3 bg-slate-950/30 border border-white/10 rounded-2xl px-5 py-3">
            <input
              type="checkbox"
              name="hvac"
              checked={form.hvac}
              onChange={(e) => setForm(p => ({ ...p, hvac: e.target.checked }))}
              className="w-5 h-5 rounded cursor-pointer accent-orange-400"
            />
            <label className="text-sm text-white/75 cursor-pointer flex-1">HVAC Active (+10%)</label>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-white/75">Traffic Condition</label>
            <select
              name="traffic"
              value={form.traffic}
              onChange={onChange}
              className="w-full h-14 rounded-2xl px-5 text-sm text-white/90
                         bg-slate-950/30 border border-white/10 backdrop-blur
                         outline-none transition-all duration-200
                         hover:border-orange-400/40 hover:bg-slate-950/40
                         focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400/60"
            >
              <option value="free">Free Flow</option>
              <option value="medium">Medium (+5-10%)</option>
              <option value="heavy">Heavy (+10-20%)</option>
            </select>
          </div>
        </div>
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-600/15 p-3 text-sm text-red-200">
          {String(error)}
        </div>
      ) : null}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isPlanning}
        className="w-full rounded-2xl py-4 font-semibold text-white
                   bg-linear-to-r from-orange-500 via-slate-800 to-orange-500
                   shadow-glow disabled:opacity-60 disabled:cursor-not-allowed
                   border border-white/10"
      >
        {isPlanning ? "Planning…" : "Generate Optimized Route"}
      </motion.button>
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-white/75">{label}</label>
      <input
        {...props}
        className="w-full h-14 rounded-2xl px-5 text-sm text-white/90 placeholder:text-white/35
                   bg-slate-950/30 border border-white/10 backdrop-blur
                   outline-none transition-all duration-200
                   hover:border-orange-400/40 hover:bg-slate-950/40
                   focus:ring-2 focus:ring-orange-400/60 focus:border-orange-400/60"
      />
    </div>
  );
}