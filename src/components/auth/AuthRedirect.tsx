import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, useUser } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

export const AuthRedirect = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { user, isLoaded: userLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
  if (!isLoaded || !userLoaded) return;

  if (!isSignedIn) {
    navigate("/get-started", { replace: true });
    return;
  }

  // Safe role extraction
  const roleRaw = user?.publicMetadata?.role;
  const role = typeof roleRaw === "string" ? roleRaw.toLowerCase() : "";

  if (role === "admin") navigate("/admin/dashboard", { replace: true });
  else if (role === "doctor") navigate("/doctor/dashboard", { replace: true });
  else if (role === "user") navigate("/user/dashboard", { replace: true });
  else navigate("/get-started", { replace: true }); // fallback
}, [isSignedIn, isLoaded, user, userLoaded, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Redirecting to your dashboard...</p>
      </div>
    </div>
  );
};
