import { useState } from "react";

export default function MultiAuth() {
  const [role, setRole] = useState<"user" | "admin">("user");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Backend endpoint based on role + mode
    const endpoint = `/api/${role}/${mode}`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user info in localStorage
        localStorage.setItem("username", data.user?.name || "Guest");
        localStorage.setItem("role", role);

        // Redirect based on role
        if (role === "admin") {
          window.location.href = "/admin/dashboard";
        } else {
          window.location.href = "/user/dashboard";
        }
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {mode === "login" ? "Login" : "Signup"}
        </h2>

        {/* Role Selection */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            type="button"
            className={`px-4 py-2 rounded ${role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${role === "admin" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            type="button"
            className={`px-4 py-2 rounded ${mode === "login" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded ${mode === "signup" ? "bg-green-500 text-white" : "bg-gray-200"}`}
            onClick={() => setMode("signup")}
          >
            Signup
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {mode === "login" ? "Login" : "Signup"} as {role}
          </button>
        </form>
      </div>
    </div>
  );
}
