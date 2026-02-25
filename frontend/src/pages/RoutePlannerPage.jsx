import React from "react";
import RouteForm from "../components/RouteForm.jsx";


export default function RoutePlannerPage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Route Planner</h2>
      <RouteForm />
    </div>
  );
}
