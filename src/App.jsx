import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./store/hooks";

// Pages
import AdminDoctorDashboard from "./pages/AdminDoctorDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import LoginPage from "./pages/LoginPage";

// Role-based router
function RootRouteRouter() {
  const role = useAppSelector((s) => s.auth.role);

  // If no role → force login
  if (!role) return <Navigate to="/login" replace />;

  const normalized = role.toLowerCase();

  if (normalized === "admin" || normalized === "doctor") {
    return <AdminDoctorDashboard />;
  }

  return <StaffDashboard />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/*" element={<RootRouteRouter />} />
    </Routes>
  );
}
