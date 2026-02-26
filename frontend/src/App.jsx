import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import InputPage from "./pages/InputPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import RoutePlannerPage from "./pages/RoutePlannerPage.jsx";
import MapPage from "./pages/MapPage.jsx";
import StationsPage from "./pages/StationsPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* entry route keeps the full-screen input form */}
        <Route path="/" element={<RoutePlannerPage />} />

        {/* everything else lives inside the chrome layout */}
        <Route
          path="/dashboard"
          element={
            <Layout>
              <DashboardPage />
            </Layout>
          }
        />
        <Route
          path="/planner"
          element={
            <Layout>
              <InputPage />
            </Layout>
          }
        />
        <Route
          path="/map"
          element={
            <Layout>
              <MapPage />
            </Layout>
          }
        />
        <Route
          path="/stations"
          element={
            <Layout>
              <StationsPage />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <SettingsPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactPage />
            </Layout>
          }
        />

        {/* fallback - redirect unknown paths to start */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
