import React from "react";
import GlassCard from "./GlassCard.jsx";

export default function SummaryCards({ planResult }) {
  const { route, simulation } = planResult;

  const distance = route.distanceKm;
  const driveH = simulation.drivingTimeHours;
  const chargeH = simulation.chargingTimeHours;
  const totalEnergy = simulation.totalEnergyKwh;
  const cost = simulation.tripCost;
  const costBreakdown = simulation.costBreakdown || {};

  // Calculate total trip time
  const totalTripTimeHours = driveH + chargeH;

  const cards = [
    {
      title: "Total Distance",
      value: `${distance.toFixed(1)} km`,
      hint: "Route distance"
    },
    {
      title: "Driving Time",
      value: `${driveH.toFixed(2)} h`,
      hint: "Active driving"
    },
    {
      title: "Charging Time",
      value: `${chargeH.toFixed(2)} h`,
      hint: "At stations"
    },
    {
      title: "Total Trip Duration",
      value: `${totalTripTimeHours.toFixed(2)} h`,
      hint: "Driving + Charging"
    },
    {
      title: "Energy Required",
      value: `${totalEnergy.toFixed(2)} kWh`,
      hint: "Base consumption"
    },
    {
      title: "Trip Cost",
      value: `₹${Number(cost).toFixed(2)}`,
      hint: "Estimated total"
    },
    {
      title: "Driving Energy Cost",
      value: `₹${(costBreakdown.drivingEnergyCost || 0).toFixed(2)}`,
      hint: "Consumption cost"
    },
    {
      title: "Charging Cost",
      value: `₹${(costBreakdown.chargingCost || 0).toFixed(2)}`,
      hint: "At stops"
    },
    {
      title: "Battery Health Impact",
      value: simulation.advanced.batteryHealthImpact.level,
      hint: `${(simulation.advanced.batteryHealthImpact.sohImpact * 100).toFixed(2)}% SoH`
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {cards.map((c) => (
        <GlassCard key={c.title} className="p-4">
          <div className="text-xs text-brand-accent">{c.title}</div>
          <div className="mt-1 text-xl font-semibold text-white">{c.value}</div>
          <div className="mt-1 text-xs text-white/60">{c.hint}</div>
        </GlassCard>
      ))}
    </div>
  );
}
