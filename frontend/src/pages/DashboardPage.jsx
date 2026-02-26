import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SummaryCards from "../components/SummaryCards.jsx";
import MapView from "../components/MapView.jsx";
import SocChart from "../components/SocChart.jsx";
import StopsTable from "../components/StopsTable.jsx";
import EnergyChart from "../components/EnergyChart.jsx";
import TripBreakdownChart from "../components/TripBreakdownChart.jsx";
import CostBreakdownChart from "../components/CostBreakdownChart.jsx";
import SensitivityPanel from "../components/SensitivityPanel.jsx";
import { useTrip } from "../context/TripContext.jsx";

export default function DashboardPage() {
  const { planResult } = useTrip();
  const location = useLocation();

  // scroll to anchor when hash changes or page loads
  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        // give time for layout to paint
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 50);
      }
    }
  }, [location.hash]);

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
      {/* sections with ids for sidebar anchors */}
      <div id="summary">
        <SummaryCards planResult={planResult} />
      </div>
      <div id="map">
        <MapView planResult={planResult} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="charts">
        <div id="soc-chart">
          <SocChart planResult={planResult} />
        </div>
        <div id="energy-chart">
          <EnergyChart planResult={planResult} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="breakdown-charts">
        <div id="trip-breakdown">
          <TripBreakdownChart planResult={planResult} />
        </div>
        <div id="cost-breakdown">
          <CostBreakdownChart planResult={planResult} />
        </div>
      </div>

      <div id="sensitivity">
        <SensitivityPanel planResult={planResult} />
      </div>

      <div id="stops">
        <StopsTable planResult={planResult} />
      </div>
    </div>
  );
}
