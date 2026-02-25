import React from "react";
import SummaryCards from "../components/SummaryCards.jsx";
import MapView from "../components/MapView.jsx";
import SocChart from "../components/SocChart.jsx";
import StopsTable from "../components/StopsTable.jsx";
import EnergyChart from "../components/EnergyChart.jsx";
import { useTrip } from "../context/TripContext.jsx";

export default function DashboardPage() {
  const { planResult } = useTrip();

  if (!planResult) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center text-white/80">
          <p>No plan available. Please create a route first.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <SummaryCards planResult={planResult} />
      <MapView planResult={planResult} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SocChart planResult={planResult} />
        <EnergyChart planResult={planResult} />
      </div>

      <StopsTable planResult={planResult} />
    </div>
  );
}
