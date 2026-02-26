import React, { useState, useMemo } from "react";
import GlassCard from "./GlassCard.jsx";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from "recharts";

export default function SensitivityPanel({ planResult }) {
  const [weatherMultiplier, setWeatherMultiplier] = useState(1);
  const [trafficMultiplier, setTrafficMultiplier] = useState(1);

  const baseEnergy = planResult.simulation.totalEnergyKwh;
  const baseCost = planResult.simulation.tripCost;

  // Calculate adjusted values
  const adjustedEnergyWeather = baseEnergy * weatherMultiplier;
  const adjustedEnergyTraffic = adjustedEnergyWeather * trafficMultiplier;
  const adjustedCost = adjustedEnergyTraffic * (planResult.input.pricing.electricityRatePerKwh || 10);

  const scenarioData = useMemo(() => {
    return [
      { scenario: "Base", energy: baseEnergy.toFixed(2), cost: baseCost.toFixed(2) },
      {
        scenario: "Weather",
        energy: adjustedEnergyWeather.toFixed(2),
        cost: (adjustedEnergyWeather * (planResult.input.pricing.electricityRatePerKwh || 10)).toFixed(2),
      },
      {
        scenario: "Traffic",
        energy: adjustedEnergyTraffic.toFixed(2),
        cost: adjustedCost.toFixed(2),
      },
    ];
  }, [weatherMultiplier, trafficMultiplier, baseEnergy, baseCost, planResult]);

  const colors = ["#3b82f6", "#ff7a00", "#10b981"];

  return (
    <GlassCard>
      <div className="space-y-6">
        {/* Title */}
        <div>
          <h2 className="text-lg font-semibold text-white">Sensitivity Analysis</h2>
          <p className="text-xs text-white/60 mt-1">
            Adjust weather & traffic conditions to see impact on energy & cost
          </p>
        </div>

        {/* Weather Sensitivity Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-white">
              Weather Impact: {(weatherMultiplier * 100).toFixed(0)}%
            </label>
            <span className="text-xs text-white/60">
              {weatherMultiplier < 1
                ? "Favorable"
                : weatherMultiplier === 1
                ? "Neutral"
                : "Harsh"}
            </span>
          </div>
          <input
            type="range"
            min="0.8"
            max="1.5"
            step="0.05"
            value={weatherMultiplier}
            onChange={(e) => setWeatherMultiplier(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-white/50 mt-2">
            <span>Favorable (0.8x)</span>
            <span>Neutral (1.0x)</span>
            <span>Harsh (1.5x)</span>
          </div>
        </div>

        {/* Traffic Sensitivity Slider */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="text-sm font-semibold text-white">
              Traffic Impact: {(trafficMultiplier * 100).toFixed(0)}%
            </label>
            <span className="text-xs text-white/60">
              {trafficMultiplier < 1
                ? "Free Flow"
                : trafficMultiplier === 1
                ? "Normal"
                : "Congested"}
            </span>
          </div>
          <input
            type="range"
            min="0.9"
            max="1.25"
            step="0.05"
            value={trafficMultiplier}
            onChange={(e) => setTrafficMultiplier(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
          <div className="flex justify-between text-xs text-white/50 mt-2">
            <span>Free Flow (0.9x)</span>
            <span>Normal (1.0x)</span>
            <span>Heavy (1.25x)</span>
          </div>
        </div>

        {/* Scenario Comparison Chart */}
        <div>
          <p className="text-sm font-semibold text-white mb-3">Energy & Cost Comparison</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scenarioData}>
                <XAxis dataKey="scenario" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{
                    background: "rgba(2,6,23,0.9)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="energy" name="Energy (kWh)" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-white/10">
          <div className="text-center">
            <div className="text-xs text-white/60">Energy Change</div>
            <div className="text-sm font-semibold text-white mt-1">
              {((adjustedEnergyTraffic - baseEnergy) / baseEnergy * 100).toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-white/60">Cost Change</div>
            <div className="text-sm font-semibold text-white mt-1">
              {((adjustedCost - baseCost) / baseCost * 100).toFixed(1)}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-white/60">Additional Cost</div>
            <div className="text-sm font-semibold text-white mt-1">
              ₹{(adjustedCost - baseCost).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
