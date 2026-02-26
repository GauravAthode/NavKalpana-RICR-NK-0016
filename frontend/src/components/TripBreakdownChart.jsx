import React from "react";
import GlassCard from "./GlassCard.jsx";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export default function TripBreakdownChart({ planResult }) {
  const drivingHours = planResult.simulation.drivingTimeHours;
  const chargingHours = planResult.simulation.chargingTimeHours;
  const totalHours = drivingHours + chargingHours;

  const timeData = [
    {
      name: "Driving",
      value: Number(drivingHours.toFixed(2)),
      percentage: ((drivingHours / totalHours) * 100).toFixed(1),
    },
    {
      name: "Charging",
      value: Number(chargingHours.toFixed(2)),
      percentage: ((chargingHours / totalHours) * 100).toFixed(1),
    },
  ];

  const COLORS = ["#3b82f6", "#ff7a00"];

  return (
    <GlassCard>
      <div>
        <h3 className="text-sm font-semibold text-white">Trip Time Breakdown</h3>
        <p className="text-xs text-white/80 mt-1">
          Total Duration: {totalHours.toFixed(2)} hours
        </p>
      </div>

      <div className="mt-6 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={timeData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              label={({ name, percentage }) => `${name} ${percentage}%`}
            >
              {timeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value.toFixed(2)} h`}
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
            <p className="text-xs text-white/80">Driving</p>
          </div>
          <p className="text-lg font-semibold text-white">{drivingHours.toFixed(2)} h</p>
          <p className="text-xs text-white/60">{((drivingHours / totalHours) * 100).toFixed(1)}% of total</p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#ff7a00" }}></div>
            <p className="text-xs text-white/80">Charging</p>
          </div>
          <p className="text-lg font-semibold text-white">{chargingHours.toFixed(2)} h</p>
          <p className="text-xs text-white/60">{((chargingHours / totalHours) * 100).toFixed(1)}% of total</p>
        </div>
      </div>
    </GlassCard>
  );
}
