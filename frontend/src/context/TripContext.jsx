 
import React, { createContext, useContext, useMemo, useState } from "react";

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [planResult, setPlanResult] = useState(() => {
    try {
      const stored = localStorage.getItem("planResult");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isPlanning, setIsPlanning] = useState(false);
  const [error, setError] = useState("");

  // persist planResult to localStorage whenever it changes
  React.useEffect(() => {
    try {
      if (planResult) {
        localStorage.setItem("planResult", JSON.stringify(planResult));
      } else {
        localStorage.removeItem("planResult");
      }
    } catch {
      // ignore
    }
  }, [planResult]);

  const value = useMemo(
    () => ({ planResult, setPlanResult, isPlanning, setIsPlanning, error, setError }),
    [planResult, isPlanning, error]
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used within TripProvider");
  return ctx;
}