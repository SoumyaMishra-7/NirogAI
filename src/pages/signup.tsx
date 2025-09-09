import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Signup() {
  const { role } = useParams(); // "user" or "admin"
  const navigate = useNavigate();

  // states for form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    // 🔹 Yahan API call karke signup karna hoga (abhi dummy hai)

    // ✅ Save username in localStorage
    localStorage.setItem("username", username || firstName);

    // ✅ Redirect user based on role
    if (role === "user") {
      navigate("/user/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    }
  };

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
          {/* First + Last Name row */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          {/* Email */}
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3"
          />

          {/* Username */}
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-3"
          />

          {/* Passwords */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-3"
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-4"
          />

          {/* Checkbox */}
          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm text-gray-600 leading-none cursor-pointer"
            >
              I agree to the{" "}
              <span className="text-primary underline">Terms of Service</span>{" "}
              and{" "}
              <span className="text-primary underline">Privacy Policy</span>
            </label>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSignup}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
          >
            Create Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
