import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function EnergyChart({ planResult }) {
  const base = planResult.simulation.totalEnergyKwh;
  const weather = planResult.simulation.advanced.weatherAdjustedEnergy;
  const traffic = planResult.simulation.advanced.trafficAdjustedEnergy;

  const data = [
    { name: "Base", energy: base },
    { name: "Weather", energy: weather },
    { name: "Traffic", energy: traffic }
  ];

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="energy" strokeWidth={3} stroke="#948979" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}