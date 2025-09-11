import { Navigate, useLocation } from 'react-router-dom';
import { useAuth, useUser } from "@clerk/clerk-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'user' | 'admin' | 'doctor';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { isLoaded, isSignedIn } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const location = useLocation();

  // 1️⃣ Loader until auth & user loaded
  if (!isLoaded || !userLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // 2️⃣ If not signed-in, redirect
  if (!isSignedIn) {
    return <Navigate to="/get-started" state={{ from: location }} replace />;
  }

  // 3️⃣ Read role safely
  const userRole = typeof user?.publicMetadata?.role === 'string' 
    ? user.publicMetadata.role.toLowerCase() 
    : '';

  // 4️⃣ Role checking (only if requiredRole is provided)
  if (requiredRole) {
    if (userRole !== requiredRole) {
      // Redirect to correct dashboard instead of blocking
      if (userRole === 'admin') return <Navigate to="/admin/dashboard" replace />;
      if (userRole === 'doctor') return <Navigate to="/doctor/dashboard" replace />;
      if (userRole === 'user') return <Navigate to="/user/dashboard" replace />;
      return <Navigate to="/get-started" replace />; // fallback if no role
    }
  }

  // ✅ Allow access
  return <>{children}</>;
};

// Convenience wrappers
export const UserRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="user">{children}</ProtectedRoute>
);

export const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="admin">{children}</ProtectedRoute>
);

export const DoctorRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute requiredRole="doctor">{children}</ProtectedRoute>
);
