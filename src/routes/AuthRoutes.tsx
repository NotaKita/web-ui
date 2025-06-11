import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "@/pages/auth/auth";

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
