import React from "react";

export default function WeatherTrafficControls({ onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Temperature °C"
        onChange={(e) => onChange("temperature", e.target.value)}
        className="p-2 rounded-lg border border-[#393E46]/40 bg-[#393E46]/30 text-white placeholder-white/60 transition-colors duration-200 focus:border-[#948979] focus:bg-[#393E46]/50"
      />
      <select onChange={(e) => onChange("traffic", e.target.value)} className="p-2 rounded-lg border border-[#393E46]/40 bg-[#393E46]/30 text-white transition-colors duration-200 focus:border-[#948979]">
        <option value="free">Free Flow</option>
        <option value="medium">Medium</option>
        <option value="heavy">Heavy</option>
      </select>
    </div>
  );
}