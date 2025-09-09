// src/pages/DashboardHome.tsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "lucide-react";

const quickActions = [
  {
    title: "Chat with HealthBot",
    description: "Get instant health advice and answers",
    icon: Bot,
    href: "/dashboard/chat",
    color: "text-blue-600",
  },
  {
    title: "Check Symptoms",
    description: "Assess symptoms and get guidance",
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
  {
    title: "Symptom Check Completed",
    time: "2 hours ago",
    type: "symptom",
  },
  {
    title: "Health Tip: 'Benefits of Walking'",
    time: "1 day ago",
    type: "tip",
  },
  {
    title: "Vaccination Reminder Set",
    time: "2 days ago",
    type: "vaccination",
  },
  {
    title: "Chat Session with AI",
    time: "3 days ago",
    type: "chat",
  },
];

export default function DashboardHome() {
  const [username, setUsername] = useState("");
  

  useEffect(() => {
    const storedName = localStorage.getItem("username");
    if (storedName) {
      setUsername(storedName);
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("username");
  navigate("/"); 
};

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-medical-hero rounded-xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            
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
              className="text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getGreeting()}, {username || "User"}!
          </h1>
          <p className="text-white/90 text-lg">
            Your comprehensive healthcare assistant is ready to help you stay
            healthy and informed.
          </p>
          <div className="flex flex-wrap gap-3 mt-4">
            <Button asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/dashboard/chat">
                <Bot className="w-4 h-4 mr-2" />
                Start Chat with HealthBot
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Quick Actions
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link key={index} to={action.href}>
                <Card className="group hover:shadow-medical transition-all duration-300 cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className={`w-5 h-5 ${action.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground truncate">
                          {action.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
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
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Your Health Overview
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {healthMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {metric.title}
                      </p>
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

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <CardDescription>Your latest health interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <ChatInterface className="h-full" />
        </div>
      </div>
    </div>
  );
}
