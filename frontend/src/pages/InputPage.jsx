import React from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "../context/TripContext.jsx";
import RouteForm from "../components/RouteForm.jsx";
import Logo from "../assets/logo.png";

// full-screen centered form without navbar
export default function InputPage() {
  const navigate = useNavigate();
  const { planResult } = useTrip();

  React.useEffect(() => {
    if (planResult) {
      navigate("/dashboard");
    }
  }, [planResult, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-br from-brand-primary to-brand-secondary">
      <div className="max-w-lg w-full p-8 bg-brand-light/10 backdrop-blur rounded-3xl">
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="VoltPath logo" className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold text-brand-light mb-6 text-center">
          VoltPath Route Planner
        </h1>
        <RouteForm />
      </div>
    </div>
  );
}
