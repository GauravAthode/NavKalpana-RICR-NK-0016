import React from "react";
import GlassCard from "./GlassCard.jsx";

export default function StopsTable({ planResult }) {
  const stops = planResult.simulation.stops || [];

  return (
    <GlassCard>
      <div className="text-sm font-semibold text-white">Charging Stops</div>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-[#948979]/80">
            <tr className="border-b border-white/30">
              <th className="py-2 text-left font-medium">#</th>
              <th className="py-2 text-left font-medium">Station</th>
              <th className="py-2 text-left font-medium">Power</th>
              <th className="py-2 text-left font-medium">Arrival SoC</th>
              <th className="py-2 text-left font-medium">Target SoC</th>
              <th className="py-2 text-left font-medium">Energy Added</th>
              <th className="py-2 text-left font-medium">Time</th>
              <th className="py-2 text-left font-medium">Cost</th>
            </tr>
          </thead>
          <tbody>
            {stops.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-6 text-white/60">
                  No charging stops required for this trip.
                </td>
              </tr>
            ) : (
              stops.map((s, i) => (
                <tr key={i} className="border-b border-white/20">
                  <td className="py-3">{i + 1}</td>
                  <td className="py-3 font-medium">{s.name}</td>
                  <td className="py-3">{s.powerKw} kW</td>
                  <td className="py-3">{s.arrivalSoc}%</td>
                  <td className="py-3">{s.targetSoc}%</td>
                  <td className="py-3">{s.energyAddedKwh} kWh</td>
                  <td className="py-3">{s.chargingTimeMin} min</td>
                  <td className="py-3">₹{s.cost}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}