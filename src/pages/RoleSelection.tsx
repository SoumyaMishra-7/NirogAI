// src/pages/RoleSelection.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield } from "lucide-react";
import { Link } from "react-router-dom";

export default function RoleSelection() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full p-6">
        
        {/* User Card */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="text-center">
            <User className="w-12 h-12 mx-auto text-blue-500 mb-2" />
            <CardTitle>User</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 items-center">
            <Button asChild className="w-40">
              <Link to="/user/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-40">
              <Link to="/user/signup">Sign Up</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Admin Card */}
        <Card className="hover:shadow-lg transition-all">
          <CardHeader className="text-center">
            <Shield className="w-12 h-12 mx-auto text-green-500 mb-2" />
            <CardTitle>Admin</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 items-center">
            <Button asChild className="w-40">
              <Link to="/admin/login">Login</Link>
            </Button>
            <Button asChild variant="outline" className="w-40">
              <Link to="/admin/signup">Sign Up</Link>
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
