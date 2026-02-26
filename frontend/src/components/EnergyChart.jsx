import React from "react";
import GlassCard from "./GlassCard.jsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function EnergyChart({ planResult }) {
  const segmentData = planResult.simulation.segmentData || [];
  const base = planResult.simulation.totalEnergyKwh;
  const weather = planResult.simulation.advanced.weatherAdjustedEnergy;
  const traffic = planResult.simulation.advanced.trafficAdjustedEnergy;

  // Show both segment breakdown and energy adjustment comparison
  const hasSegments = segmentData.length > 0;

  // If no segments, show energy factors
  const chartData = hasSegments
    ? segmentData.map((s, i) => ({
        name: `Seg ${i + 1}`,
        energy: s.energyKwh,
        distance: s.distanceKm,
      }))
    : [
        { name: "Base", energy: base },
        { name: "Weather", energy: weather },
        { name: "Traffic", energy: traffic },
      ];

  const colors = ["#ff7a00", "#ffa040", "#ffb366", "#ff8c1a", "#ff6600"];

  return (
    <GlassCard>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold text-white">
            {hasSegments ? "Energy per Segment" : "Energy Breakdown"}
          </div>
          <div className="text-xs text-white/80">
            {hasSegments
              ? "kWh required by segment"
              : "Base, Weather & Traffic adjusted"}
          </div>
        </div>
        <div className="text-xs text-white/60">Energy (kWh)</div>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis
              dataKey="name"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                background: "rgba(2,6,23,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
            <Bar dataKey="energy" radius={[8, 8, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {hasSegments && (
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/70">
          <div className="flex justify-between">
            <span>Base Energy:</span>
            <span className="font-semibold">{base.toFixed(2)} kWh</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Weather Adjusted:</span>
            <span className="font-semibold">{weather.toFixed(2)} kWh</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Traffic Adjusted:</span>
            <span className="font-semibold">{traffic.toFixed(2)} kWh</span>
          </div>
        </div>
      )}
    </GlassCard>
  );
}