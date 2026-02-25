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
  const { setPlanResult, isPlanning, setIsPlanning, error, setError } =
    useTrip();

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Start Location"
          name="start"
          value={form.start}
          onChange={onChange}
        />
        <Input
          label="Destination"
          name="destination"
          value={form.destination}
          onChange={onChange}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Input
          label="Battery (kWh)"
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
        <Input
          label="Usable %"
          name="usableBatteryPercent"
          value={form.usableBatteryPercent}
          onChange={onChange}
          type="number"
        />
        <Input
          label="Reserve SoC %"
          name="minimumReserveSocPercent"
          value={form.minimumReserveSocPercent}
          onChange={onChange}
          type="number"
        />
        <Input
          label="Rate (₹/kWh)"
          name="electricityRatePerKwh"
          value={form.electricityRatePerKwh}
          onChange={onChange}
          type="number"
        />
      </div>

      {error ? (
        <div className="rounded-2xl border border-red-400/30 bg-red-600/20 p-3 text-sm text-red-200">
          {String(error)}
        </div>
      ) : null}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isPlanning}
        className="w-full rounded-2xl py-3 font-semibold bg-linear-to-r from-[#222831] via-[#948979] to-[#393E46] text-white shadow-glow hover:shadow-2xl transition-shadow duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPlanning ? "Planning…" : "Generate Optimized Route"}
      </motion.button>

      
    </form>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-1">
      <div className="text-xs text-white/80">{label}</div>
      <input
        {...props}
        className="w-full rounded-2xl border border-[#393E46]/20 bg-[#393E46]/40 px-4 py-3 text-sm text-white placeholder-white/60 outline-none transition-colors duration-200 focus:border-[#948979] focus:bg-[#393E46]/60"
      />
    </div>
  );
}
