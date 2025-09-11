import { useParams } from "react-router-dom";
import { SignUp } from "@clerk/clerk-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Signup() {
  const { role } = useParams<{ role: string }>(); // "user" or "admin"

  return (
    <div className="flex items-center justify-center min-h-screen bg-yellow-50">
      <Card className="w-[450px] shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create Account
          </CardTitle>
          <p className="text-center text-gray-500 text-sm">
            Join our community as a <span className="font-medium">{role}</span>
          </p>
        </CardHeader>

        <CardContent>
          <SignUp
            routing="path"
            path={`/${role}/signup`}
            signInUrl={`/${role}/login`}
            afterSignUpUrl={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
          />
        </CardContent>
      </Card>
    </div>
  );
}
