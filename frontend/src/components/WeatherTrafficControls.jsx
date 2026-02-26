import React from "react";

export default function WeatherTrafficControls({ onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Temperature °C"
        onChange={(e) => onChange("temperature", e.target.value)}
        className="p-2 rounded-lg border border-brand-secondary/40 bg-brand-secondary/30 text-brand-text placeholder-brand-text/60 transition-colors duration-200 focus:border-brand-accent focus:bg-brand-secondary/50"
      />
      <select onChange={(e) => onChange("traffic", e.target.value)} className="p-2 rounded-lg border border-brand-secondary/40 bg-brand-secondary/30 text-brand-text transition-colors duration-200 focus:border-brand-accent">
        <option value="free">Free Flow</option>
        <option value="medium">Medium</option>
        <option value="heavy">Heavy</option>
      </select>
    </div>
  );
}