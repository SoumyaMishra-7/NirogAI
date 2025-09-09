import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import NotFound from "./pages/NotFound";
import { ChatInterface } from "./components/chat/ChatInterface";
import VaccinationTracker from "./pages/dashboard/VaccinationTracker"; 
import Symptoms from "./pages/dashboard/symptoms";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={
            <DashboardLayout>
              <DashboardHome />
            </DashboardLayout>
          } />
          <Route path="/dashboard/chat" element={
            <DashboardLayout>
              <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                  <h1 className="text-2xl font-bold text-foreground mb-2">Chat with AI Health Assistant</h1>
                  <p className="text-muted-foreground">Get instant health advice and answers to your questions</p>
                </div>
                <ChatInterface />
              </div>
            </DashboardLayout>
          } />
          <Route path="/dashboard/VaccinationTracker" element={
            <DashboardLayout>
              <VaccinationTracker />
            </DashboardLayout>
          } />
          <Route path="/dashboard/symptoms" element={
            <DashboardLayout>
              <Symptoms />
            </DashboardLayout>
          } />
          <Route path="/dashboard/vaccination" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Vaccination Info</h1>
                <p className="text-muted-foreground">Coming soon - Vaccination schedules and reminders</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/dashboard/records" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Health Records</h1>
                <p className="text-muted-foreground">Coming soon - Secure document management</p>
              </div>
            </DashboardLayout>
          } />
          <Route
  path="/admin/dashboard"
  element={
    <DashboardLayout userRole="admin">
      <AdminDashboard />
    </DashboardLayout>
  }
/>

          <Route path="/dashboard/medicines" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Medicines & Prescriptions</h1>
                <p className="text-muted-foreground">Coming soon - Medicine information database</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/dashboard/tips" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Health Tips & Articles</h1>
                <p className="text-muted-foreground">Coming soon - Wellness content library</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/dashboard/appointments" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Appointments</h1>
                <p className="text-muted-foreground">Coming soon - Doctor appointment booking</p>
              </div>
            </DashboardLayout>
          } />
          <Route path="/dashboard/profile" element={
            <DashboardLayout>
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Profile & Settings</h1>
                <p className="text-muted-foreground">Coming soon - Account management</p>
              </div>
            </DashboardLayout>
          } />
          
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <DashboardLayout userRole="admin">
              <div className="text-center py-12">
                <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
                <p className="text-muted-foreground">Coming soon - Administrative features</p>
              </div>
            </DashboardLayout>
          } />
           {/* Get Started → Role Selection */}
          <Route path="/get-started" element={<RoleSelection/>} />

          {/* Auth Routes */}
<Route path="/:role/login" element={<Login />} />
<Route path="/:role/signup" element={<Signup />} />
{/* User Dashboard */}
<Route path="/user/dashboard" element={
  <DashboardLayout>
    <DashboardHome />
  </DashboardLayout>
} />

{/* Admin Dashboard */}
<Route path="/admin/dashboard" element={
  <DashboardLayout userRole="admin">
    <div className="text-center py-12">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="text-muted-foreground">Welcome, Admin!</p>
    </div>
  </DashboardLayout>
} />

          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;