import React from "react";
import { Navigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";

const ProtectedRoute = ({ children }) => {
  const { user } = useUserStore(); // Zustand store 사용
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
