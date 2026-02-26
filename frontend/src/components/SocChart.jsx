import React from "react";
import GlassCard from "./GlassCard.jsx";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export default function SocChart({ planResult }) {
  const series = planResult.simulation.socSeries || [];
  const route = planResult.route || {};
  const stops = planResult.simulation.stops || [];

  // Build data with segment info
  let cumulativeDistance = 0;
  const data = series.map((soc, i) => {
    // Find the segment distance for this point
    let distanceAtThisPoint = 0;
    
    if (i === 0) {
      distanceAtThisPoint = 0;
    } else if (i <= stops.length) {
      // Get distance from segmentData if available
      const segmentData = planResult.simulation.segmentData || [];
      if (segmentData.length > i - 1) {
        distanceAtThisPoint = segmentData.slice(0, i).reduce((sum, s) => sum + s.distanceKm, 0);
      } else {
        // Fallback: distribute total distance
        distanceAtThisPoint = (route.distanceKm || 0) * (i / Math.max(series.length, 1));
      }
    } else {
      distanceAtThisPoint = route.distanceKm || 0;
    }

    return {
      point: i + 1,
      soc: Number(soc.toFixed(1)),
      distance: Number(distanceAtThisPoint.toFixed(1)),
      distanceLabel: `${Number(distanceAtThisPoint.toFixed(1))} km`
    };
  });

  return (
    <GlassCard>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold text-white">Battery SoC Curve</div>
          <div className="text-xs text-white/80">State of Charge along route segments</div>
        </div>
        <div className="flex gap-4 text-xs text-white/60">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#ff7a00" }}></div>
            SoC (%)
          </div>
        </div>
      </div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
            <XAxis 
              dataKey="distance"
              label={{ value: "Distance (km)", position: "insideBottomRight", offset: -10, fill: "#94a3b8" }}
              tick={{ fill: "#94a3b8", fontSize: 12 }} 
            />
            <YAxis 
              label={{ value: "SoC (%)", angle: -90, position: "insideLeft" }}
              tick={{ fill: "#94a3b8", fontSize: 12 }} 
              domain={[0, 100]} 
            />
            <Tooltip 
              contentStyle={{ background: "rgba(2,6,23,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}
              labelFormatter={(label) => `Distance: ${label} km`}
              formatter={(value) => [`${value}%`, 'SoC']}
            />
            <Line 
              type="monotone" 
              dataKey="soc" 
              strokeWidth={3} 
              dot={false} 
              stroke="#ff7a00"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend showing charging stops */}
      {stops.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs font-semibold text-white/80 mb-2">Charging Stops Impacting SoC Curve:</p>
          <div className="space-y-2 max-h-24 overflow-y-auto">
            {stops.map((stop, i) => (
              <div key={i} className="text-xs text-white/70 flex justify-between">
                <span>{i + 1}. {stop.name}</span>
                <span>Arrival: {stop.arrivalSoc}% → Target: {stop.targetSoc}%</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  );
}