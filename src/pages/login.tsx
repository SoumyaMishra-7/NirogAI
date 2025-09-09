import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

export default function Login() {
  const { role } = useParams(); // "user" or "admin"
  const navigate = useNavigate();

  // form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 🔹 Yahan tum API call karke authentication karogi
    // For now: Dummy user name
    const dummyUser = {
      name: "Samridhi", // 👉 baad me API response se aayega
      email,
    };

    // ✅ Save username in localStorage
    localStorage.setItem("username", dummyUser.name);

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
            Welcome Back
          </CardTitle>
          <p className="text-center text-gray-500 text-sm">
            Login as <span className="font-medium">{role}</span>
          </p>
        </CardHeader>

        <CardContent>
          <Input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4"
          />

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm text-gray-600 leading-none cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
          >
            Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
