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
      <div className="max-w-md w-full p-8 bg-brand-secondary/30 backdrop-blur-lg rounded-3xl shadow-2xl animate-fade">
        <div className="flex justify-center mb-4">
          <img src={Logo} alt="VoltPath logo" className="h-12 w-12" />
        </div>
        <h1 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-linear-to-r from-orange-400 via-yellow-300 to-orange-400">
          VoltPath Route Planner
        </h1>
        <RouteForm />
      </div>
    </div>
  );
}
