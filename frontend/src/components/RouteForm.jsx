import React, { useState } from "react";
import { motion } from "framer-motion";
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
};

export default function RouteForm() {
  const [form, setForm] = useState(defaultState);
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

        // If your backend expects environment.* then change accordingly.
        // Keeping your current payload structure as-is.
        weather: {
          temperature: Number(form.temperature || 25),
          wind: "none",
          hvac: true,
        },
        traffic: form.traffic || "free",
      };

      const { data } = await apiClient.post("/trips/plan", payload);
      if (!data.ok) throw new Error("Planning failed");
      setPlanResult(data);
    } catch (err) {
      setError(err?.response?.data?.error || err.message);
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
                   bg-gradient-to-r from-orange-500 via-slate-800 to-orange-500
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