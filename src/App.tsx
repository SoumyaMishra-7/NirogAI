import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";

import HomePage from "./pages/HomePage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import VaccinationTracker from "./pages/dashboard/VaccinationTracker"; 
import Symptoms from "./pages/dashboard/symptoms";
import { ChatInterface } from "./components/chat/ChatInterface";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<RoleSelection />} />

        {/* Clerk Auth Routes (Centering SignIn / SignUp) */}
        <Route
          path="/:role/signin"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="w-full max-w-md p-4">
                <SignIn path="/:role/signin" routing="path" />
              </div>
            </div>
          }
        />
        <Route
          path="/:role/signup"
          element={
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
              <div className="w-full max-w-md p-4">
                <SignUp path="/:role/signup" routing="path" />
              </div>
            </div>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user/dashboard"
          element={
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/chat"
          element={
            <DashboardLayout>
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Chat with AI Health Assistant
                  </h1>
                  <p className="text-muted-foreground">
                    Get instant health advice and answers to your questions
                  </p>
                </div>
                <ChatInterface />
              </div>
            </DashboardLayout>
          }
        />
        
        {/* Vaccination Tracker Route */}
        <Route
          path="/dashboard/vaccination"
          element={
            <DashboardLayout>
              <VaccinationTracker />
            </DashboardLayout>
          }
        />
        
        <Route
          path="/dashboard/symptoms"
          element={
            <DashboardLayout>
              <Symptoms />
            </DashboardLayout>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <DashboardLayout userRole="admin">
              <AdminDashboard />
            </DashboardLayout>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
