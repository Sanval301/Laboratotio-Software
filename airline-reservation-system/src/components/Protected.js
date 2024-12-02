import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // Obtener el token del almacenamiento local

  // Si no hay token, redirige al inicio de sesión
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Si hay token, renderiza la ruta protegida
  return <Outlet />;
};

export default ProtectedRoute;
