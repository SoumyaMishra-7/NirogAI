import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";

const roles = [
  { 
    name: "User", 
    icon: User, 
    path: "user", 
    color: "blue-500",
    description: "Access your personal health dashboard and track your symptoms"
  },
  { 
    name: "Admin", 
    icon: Shield, 
    path: "admin", 
    color: "green-500",
    description: "Manage users, view analytics, and configure system settings"
  },
  { 
    name: "Doctor", 
    icon: Stethoscope, 
    path: "doctor", 
    color: "purple-500",
    description: "View and manage patient records and provide medical advice"
  },
];

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();
  const { isSignedIn, signOut } = useAuth();
  const { isLoaded, user } = useUser();

  // Wait for user object to load
  if (!isLoaded) return null;

  const handleStart = async () => {
    // Save role locally so you can use it across pages
    localStorage.setItem("selectedRole", selectedRole);

    if (!isSignedIn) {
      // Redirect to sign-in page if not signed in
      navigate("/sign-in", { state: { role: selectedRole } });
      return;
    }

    // No Clerk publicMetadata update here → avoids 422
    // Just navigate to the dashboard
    navigate(`/${selectedRole}/dashboard`, { replace: true });
  };

  const handleSignOut = async () => {
    await signOut();
    setSelectedRole("user"); // reset role
    localStorage.removeItem("selectedRole");
  };

  // Optional: highlight the role from localStorage if returning
  useEffect(() => {
    const savedRole = localStorage.getItem("selectedRole");
    if (savedRole) setSelectedRole(savedRole);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to NirogAI</CardTitle>
          <p className="text-muted-foreground mt-2">
            {isSignedIn
              ? "Select your role to continue"
              : "Please select your role to get started"}
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {roles.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={role.path}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedRole === role.path
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedRole(role.path)}
                >
                  <div className="flex flex-col items-center text-center">
                    <Icon className={`w-8 h-8 mb-2 text-${role.color}`} />
                    <h3 className="font-medium">{role.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {role.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleStart}
              type="button"
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              {isSignedIn ? `Continue as ${selectedRole}` : `Sign in as ${selectedRole}`}
            </Button>

            {isSignedIn && (
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="w-full"
              >
                Sign Out
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
