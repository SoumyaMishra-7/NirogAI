import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react";

// Protected routes
import { UserRoute, AdminRoute, DoctorRoute, ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthRedirect } from "@/components/auth/AuthRedirect";

// Pages
import HomePage from "./pages/HomePage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import DoctorDashboard from "./pages/dashboard/Doctordashboard";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import RoleSelection from "./pages/RoleSelection";
import VaccinationTracker from "./pages/dashboard/VaccinationTracker";
import Symptoms from "./pages/dashboard/symptoms";
import { ChatInterface } from "./components/chat/ChatInterface";
import VaccineInfo from "./pages/dashboard/VaccineInfo";
const queryClient = new QueryClient();

// Auth Layout for Clerk
const AuthLayout = ({ type }: { type: "sign-in" | "sign-up" }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
    <div className="w-full max-w-md">
      {type === "sign-in" ? (
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" afterSignInUrl="/auth/redirect" />
      ) : (
        <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" afterSignUpUrl="/auth/redirect" />
      )}
    </div>
  </div>

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


    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />

          {/* ✅ Updated Get Started */}
          <Route path="/get-started" element={<RoleSelection />} />

          {/* Auth */}
          <Route
            path="/sign-in"
            element={!isSignedIn ? <AuthLayout type="sign-in" /> : <Navigate to="/auth/redirect" replace />}
          />
          <Route
            path="/sign-up"
            element={!isSignedIn ? <AuthLayout type="sign-up" /> : <Navigate to="/auth/redirect" replace />}
          />
          <Route path="/auth/redirect" element={<AuthRedirect />} />

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

          <Route
            path="/dashboard/VaccinationTracker"
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

          <Route
            path="/dashboard/VaccineInfo"
            element={
              <DashboardLayout>
                <VaccineInfo />
              </DashboardLayout>
            }
          />

          {/* Admin Dashboard */}
          <Route
            path="/admin/dashboard"
            element={
              
                <DashboardLayout>
                  <AdminDashboard />
                </DashboardLayout>
              
            }
          />

          {/* Doctor Dashboard */}
          <Route
  path="/doctor/dashboard"
  element={
    
      <DashboardLayout>
        <DoctorDashboard />
      </DashboardLayout>
    }
  />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
