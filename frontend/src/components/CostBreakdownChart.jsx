import React from "react";
import GlassCard from "./GlassCard.jsx";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export default function CostBreakdownChart({ planResult }) {
  const costBreakdown = planResult.simulation.costBreakdown || {};
  const stops = planResult.simulation.stops || [];
  const totalCost = costBreakdown.total || planResult.simulation.tripCost;

  const costData = [
    {
      name: "Driving Energy",
      value: costBreakdown.drivingEnergyCost || 0,
      percentage: ((costBreakdown.drivingEnergyCost / totalCost) * 100).toFixed(1),
    },
    {
      name: "Charging at Stops",
      value: costBreakdown.chargingCost || 0,
      percentage: ((costBreakdown.chargingCost / totalCost) * 100).toFixed(1),
    },
  ];

  const COLORS = ["#3b82f6", "#ff7a00"];

  // Calculate average cost per stop
  const avgCostPerStop = stops.length > 0 ? costBreakdown.chargingCost / stops.length : 0;

  return (
    <GlassCard>
      <div>
        <h3 className="text-sm font-semibold text-white">Cost Breakdown</h3>
        <p className="text-xs text-white/80 mt-1">
          Total Trip Cost: ₹{totalCost.toFixed(2)}
        </p>
      </div>

      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={costData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percentage }) => `${name} ${percentage}%`}
            >
              {costData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `₹${value.toFixed(2)}`}
              contentStyle={{
                background: "rgba(2,6,23,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#3b82f6" }}></div>
            <p className="text-xs text-white/80">Driving Energy</p>
          </div>
          <p className="text-lg font-semibold text-white">₹{(costBreakdown.drivingEnergyCost || 0).toFixed(2)}</p>
          <p className="text-xs text-white/60">{costData[0].percentage}% of total</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff7a00" }}></div>
            <p className="text-xs text-white/80">Charging</p>
          </div>
          <p className="text-lg font-semibold text-white">₹{(costBreakdown.chargingCost || 0).toFixed(2)}</p>
          <p className="text-xs text-white/60">{costData[1].percentage}% of total</p>
        </div>
      </div>

      {stops.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs font-semibold text-white/80 mb-2">Charging Stop Costs:</p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {stops.map((stop, i) => (
              <div key={i} className="flex justify-between text-xs text-white/70">
                <span>{i + 1}. {stop.name}</span>
                <span className="font-semibold">₹{stop.cost.toFixed(2)}</span>
              </div>
            ))}
          </div>
          {stops.length > 0 && (
            <div className="flex justify-between text-xs text-white/60 mt-2 pt-2 border-t border-white/10">
              <span>Average per stop:</span>
              <span className="font-semibold">₹{avgCostPerStop.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}
    </GlassCard>
  );
}
