import React from "react";
import StopsTable from "../components/StopsTable.jsx";
import { useTrip } from "../context/TripContext.jsx";

export default function StationsPage() {
  const { planResult } = useTrip();

  if (!planResult) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-brand-light/80">No charging stops to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Charging Stations</h1>
      <StopsTable planResult={planResult} />
    </div>
  );
}
