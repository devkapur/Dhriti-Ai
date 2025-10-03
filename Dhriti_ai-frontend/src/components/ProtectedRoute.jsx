import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = getToken();
  const userRole = getUserRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
