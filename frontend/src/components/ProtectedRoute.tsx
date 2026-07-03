import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGymStore } from '../store/gymStore';
import { UserRole } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const currentUser = useGymStore((state) => state.currentUser);
  const location = useLocation();

  if (!currentUser) {
    // Save redirected location so users return to their workspace after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // If authenticated but lacks scoping, shunt them to generic dashboard resolver
    return <Navigate to="/portal" replace />;
  }

  return <>{children}</>;
}
