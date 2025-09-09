
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { 
  Bot, 
  Stethoscope, 
  Shield, 
  Heart, 
  BookOpen, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  MessageSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import medicalHeroBg from "@/assets/medical-hero-bg.jpg";
import Footer from "./Footer";  

const quickActions = [
  {
    title: "Chat with AI",
    description: "Get instant health advice and answers to your questions",
    icon: Bot,
    href: "/dashboard/chat",
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    title: "Check Symptoms",
    description: "Assess your symptoms and get preliminary guidance",
    icon: Stethoscope,
    href: "/dashboard/symptoms",
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    title: "Vaccination Info",
    description: "Discover daily tips for better health and wellness",
    icon: Shield,
    href: "/dashboard/vaccination",
    color: "bg-green-500/10 text-green-600"
  },
  {
    title: "Vaccination Tracker",
    description: "Keep track of your vaccination schedule",
    icon: Calendar,
    href: "/dashboard/VaccinationTracker", 
    color: "bg-orange-500/10 text-orange-600"
  }
];

const features = [
  "AI-powered health consultations",
  "Symptom checker & analysis",
  "Vaccination schedules & reminders",
  "Personal health records management",
  "Medicine information & prescriptions",
  "24/7 health support"
];

const stats = [
  { label: "Active Users", value: "10K+", icon: Users },
  { label: "Health Queries", value: "50K+", icon: MessageSquare },
  { label: "Success Rate", value: "98%", icon: CheckCircle },
  { label: "Average Rating", value: "4.9", icon: Star }
];
function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
export default function HomePage() {
  const greeting = getGreeting();

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-gradient-medical-hero"
        style={{
          backgroundImage: `url(${medicalHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-medical-hero/80" />
        <div className="absolute top-6 right-6 z-20">
    <Button
      size="lg"
      asChild
      className="bg-white text-primary font-bold tracking-wide px-6 py-3 rounded-xl 
                 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <Link to="/get-started">
        Get Started
      </Link>
    </Button>
  </div>
        <div className="relative z-10 container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <Badge variant="outline" className="mb-4 bg-white/10 text-white border-white/20">
                <Heart className="w-4 h-4 mr-2" />
                Your Health Companion
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {greeting}, <span className="text-white/90">Welcome!</span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Your comprehensive healthcare assistant is ready to help you stay healthy, 
                informed, and connected to the care you need.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  asChild
                  className="bg-white text-primary hover:bg-white/90 shadow-medical-glow"
                >
                  <Link to="/dashboard/chat">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Start Chat with HealthBot
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Explore Features
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
              
              
              {/* Features list */}
              <div className="grid grid-cols-2 gap-2 text-sm text-white/80">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right Content - Chat Interface */}
            <div className="lg:max-w-md mx-auto">
              <ChatInterface compact className="shadow-glass" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Quick Actions</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Access the most commonly used features to get the health assistance you need
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.href}>
                  <Card className="group hover:shadow-medical transition-all duration-300 cursor-pointer bg-gradient-medical-card">
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 mx-auto rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {action.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 text-center">
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary/10">
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">All Features</h2>
            <p className="text-muted-foreground text-lg">Comprehensive healthcare tools at your fingertips</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature cards would go here - similar to quick actions but more comprehensive */}
            <div className="col-span-full text-center">
              <Button size="lg" asChild>
                <Link to="/get-started">
                  <Heart className="w-5 h-5 mr-2" />
                  Explore Full Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-medical-primary text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <Icon className="w-8 h-8 mb-3 opacity-90" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Your Health Journey Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Your Health Journey</h2>
            <p className="text-muted-foreground text-lg">Track your progress and milestones</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-blue-500 text-white">
              <CardContent className="p-6 text-center">
                <Heart className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">12</div>
                <div className="text-blue-100">Health Tips Read</div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-500 text-white">
              <CardContent className="p-6 text-center">
                <Stethoscope className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">3</div>
                <div className="text-green-100">Symptoms Checked</div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-500 text-white">
              <CardContent className="p-6 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">5</div>
                <div className="text-purple-100">Quizzes Completed</div>
              </CardContent>
            </Card>
            
            <Card className="bg-orange-500 text-white">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 mx-auto mb-3" />
                <div className="text-2xl font-bold mb-1">8</div>
                <div className="text-orange-100">Reminders Set</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
