import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles = [
  { name: "User", icon: User, path: "user", color: "blue-500" },
  { name: "Admin", icon: Shield, path: "admin", color: "green-500" },
  { name: "Doctor", icon: Stethoscope, path: "doctor", color: "purple-500" },
];

export default function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("user");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/${selectedRole}/signin`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle>Select Your Role</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 items-center">
          
          {/* Toggle Buttons */}
          <div className="flex gap-2">
            {roles.map((role) => (
              <Button
                key={role.name}
                variant={selectedRole === role.path ? "default" : "outline"}
                onClick={() => setSelectedRole(role.path)}
                className="flex items-center gap-2"
              >
                <role.icon className={`w-5 h-5 text-${role.color}`} />
                {role.name}
              </Button>
            ))}
          </div>

          {/* Start Button */}
          <Button
            onClick={handleStart}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold mt-4"
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
