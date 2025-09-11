// src/pages/DashboardHome.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/chat/ChatInterface";
import {
  Bot,
  Stethoscope,
  Shield,
  BookOpen,
  Heart,
  Activity,
  Bell,
  Clock,
  LogOut,
  AlertTriangle,
  ArrowRight,
  Thermometer,
  MapPin,
  Users,
} from "lucide-react";

const quickActions = [
  {
    title: "Outbreak Alerts",
    description: "View active health alerts",
    icon: AlertTriangle,
    href: "/dashboard/outbreak-alerts",
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Chat with HealthBot",
    description: "Get instant health advice",
    icon: Bot,
    href: "/dashboard/chat",
    color: "text-blue-600",
  },
  {
    title: "Check Symptoms",
    description: "Assess symptoms quickly",
    icon: Stethoscope,
    href: "/dashboard/symptoms",
    color: "text-purple-600",
  },
  {
    title: "Health Tips",
    description: "Discover wellness tips",
    icon: BookOpen,
    href: "/dashboard/tips",
    color: "text-green-600",
  },
  {
    title: "Vaccination Tracker",
    description: "Track vaccination schedule",
    icon: Shield,
    href: "/dashboard/vaccination",
    color: "text-orange-600",
  },
];

const healthMetrics = [
  {
    title: "Health Score",
    value: "92%",
    change: "+5%",
    trend: "up",
    icon: Heart,
    color: "text-green-600",
  },
  {
    title: "Active Days",
    value: "15",
    change: "+3",
    trend: "up",
    icon: Activity,
    color: "text-blue-600",
  },
  {
    title: "Consultations",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Stethoscope,
    color: "text-purple-600",
  },
  {
    title: "Reminders",
    value: "3",
    change: "0",
    trend: "neutral",
    icon: Bell,
    color: "text-orange-600",
  },
];

const recentActivity = [
  { title: "Symptom Check Completed", time: "2 hours ago", type: "symptom" },
  { title: "Health Tip: 'Benefits of Walking'", time: "1 day ago", type: "tip" },
  { title: "Vaccination Reminder Set", time: "2 days ago", type: "vaccination" },
  { title: "Chat Session with AI", time: "3 days ago", type: "chat" },
];

const OutbreakAlertCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="border-l-4 border-orange-500 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium">Active Health Alerts</h3>
              <p className="text-sm text-muted-foreground">
                There are 3 active outbreaks in your region
              </p>
              <div className="mt-2 flex items-center text-sm text-orange-600">
                <span className="font-medium">View Alerts</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </div>
            </div>
          </div>
          <Badge variant="destructive" className="animate-pulse">
            New
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default function DashboardHome() {
  const { user } = useUser();
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };


  const handleLogout = () => {
    navigate("/");
  };

  const displayName = user?.fullName || user?.username || 'User';

  return (
    <div className="space-y-8 p-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white relative overflow-hidden shadow-lg">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-white/20 text-white border-white/30">
              <Heart className="w-5 h-5 mr-1" />

const handleLogout = () => {
  localStorage.removeItem("username");
  navigate("/login"); 
};

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-500 rounded-xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            
            <Badge
              variant="outline"
              className="bg-white/10 text-white border-white/20"
            >
              <Heart className="w-4 h-4 mr-1" />

              Health Companion
            </Badge>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="flex items-center gap-2 text-white hover:bg-white/20"
            >
              <LogOut className="w-5 h-5" /> Logout
            </Button>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            {getGreeting()}, {displayName}!
          </h1>
          <p className="text-white/90 text-lg mb-4">
            Your personalized healthcare dashboard. Stay informed and healthy.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild className="bg-white text-blue-600 hover:bg-white/90">
              <Link to="/dashboard/chat" className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Start Chat

          <div className="flex flex-col items-center justify-center text-center space-y-3 py-6">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getGreeting()}, {username || "User"}!
          </h1>
          <p className="text-white/90 text-lg max-w-xl">
            Your comprehensive healthcare assistant is ready to help you stay
            healthy and informed.
          </p>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/10 mt-4">
              <Link to="/dashboard/chat">
                <Bot className="w-4 h-4 mr-2" />
                Start Chat with HealthBot

              </Link>
            </Button>
          </div>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-12 -translate-x-12" />
      </div>

      {/* Outbreak Alert Card */}
      <div onClick={() => navigate('/dashboard/outbreak-alerts')} className="cursor-pointer">
        <OutbreakAlertCard />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;
            return (

              <Link key={i} to={action.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer rounded-xl">

              <Link key={index} to={action.href}>
                <Card className="group hover:border-blue-500 transition-all duration-300 cursor-pointer">

                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className={`w-6 h-6 ${action.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">
                          {action.title}
                        </h3>
                        <p className="text-xs text-muted-foreground truncate">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Health Metrics */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-4">Health Overview</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <Card key={i} className="rounded-xl shadow hover:shadow-lg transition-all">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-2xl font-bold text-foreground">
                          {metric.value}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            metric.trend === "up"
                              ? "text-green-600 border-green-200"
                              : metric.trend === "down"
                              ? "text-red-600 border-red-200"
                              : "text-muted-foreground"
                          }`}
                        >
                          {metric.change}
                        </Badge>
                      </div>
                    </div>
                    <Icon className={`w-8 h-8 ${metric.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity + Chat */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <Card className="rounded-xl shadow">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Your latest interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 hover:bg-muted/30 transition"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="rounded-xl shadow h-full">
            <CardContent className="h-full p-4">
              <ChatInterface className="h-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

