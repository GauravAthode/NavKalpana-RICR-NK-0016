import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { TripProvider, useTrip } from "./context/TripContext.jsx";
import Layout from "./components/Layout.jsx";
import InputPage from "./pages/InputPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import StationsPage from "./pages/StationsPage.jsx";
import RoutePlannerPage from "./pages/RoutePlannerPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

function Protected({ children }) {
  const { planResult } = useTrip();
  if (!planResult) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <TripProvider>
        <Routes>
          {/* initial input page */}
          <Route path="/" element={<InputPage />} />

          {/* layouted authenticated paths */}
          <Route
            path="/*"
            element={
              <Protected>
                <Layout>
                  <Routes>
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="map" element={<MapPage />} />
                    <Route path="stations" element={<StationsPage />} />
                    <Route path="planner" element={<RoutePlannerPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="dashboard" replace />} />
                  </Routes>
                </Layout>
              </Protected>
            }
          />
        </Routes>
      </TripProvider>
    </BrowserRouter>
  );
}