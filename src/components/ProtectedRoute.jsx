
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const adminToken = localStorage.getItem("adminToken");
  const adminUser = JSON.parse(
    localStorage.getItem("adminUser") || "null"
  );

  if (!adminToken || adminUser?.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
