import React from "react";
import RouteForm from "../components/RouteForm.jsx";


export default function RoutePlannerPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl animate-fade">
        <h2 className="text-2xl font-semibold mb-4">Route Planner</h2>
        <RouteForm />
      </div>
    </div>
  );
}
