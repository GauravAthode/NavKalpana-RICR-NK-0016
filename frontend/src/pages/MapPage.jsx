import React from "react";
import MapView from "../components/MapView.jsx";
import { useTrip } from "../context/TripContext.jsx";

export default function MapPage() {
  const { planResult } = useTrip();

  if (!planResult) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-white/80">No route generated yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold">Map View</h1>
      <MapView planResult={planResult} />
    </div>
  );
}
