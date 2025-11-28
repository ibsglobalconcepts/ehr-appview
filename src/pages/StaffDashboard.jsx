import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

export default function StaffDashboard() {
  return (
    <div className="w-full h-full">
      <Routes>
        <Route index element={<h2>Staff Dashboard Home</h2>} />

        {/* Add actual staff module pages when ready */}

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}
