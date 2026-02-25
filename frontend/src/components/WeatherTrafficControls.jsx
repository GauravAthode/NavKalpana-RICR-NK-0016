import React from "react";

export default function WeatherTrafficControls({ onChange }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <input
        type="number"
        placeholder="Temperature °C"
        onChange={(e) => onChange("temperature", e.target.value)}
        className="p-2 rounded bg-slate-900"
      />
      <select onChange={(e) => onChange("traffic", e.target.value)} className="p-2 rounded bg-slate-900">
        <option value="free">Free Flow</option>
        <option value="medium">Medium</option>
        <option value="heavy">Heavy</option>
      </select>
    </div>
  );
}