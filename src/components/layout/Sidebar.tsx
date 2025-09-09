import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Stethoscope, 
  Shield, 
  FileText, 
  Pill, 
  BookOpen, 
  User, 
  Users, 
  Database, 
  BarChart3, 
  MessageSquare, 
  Settings,
  Menu,
  X,
  Heart,
  Calendar,
  Bell
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  userRole?: 'user' | 'admin';
}

const userMenuItems = [
  {
    title: "Chat with AI",
    href: "/dashboard/chat",
    icon: Bot,
    description: "Get instant health advice"
  },
  {
    title: "Symptoms Checker",
    href: "/dashboard/symptoms",
    icon: Stethoscope,
    description: "Check your symptoms"
  },
  {
    title: "Vaccination Info",
    href: "/dashboard/vaccination",
    icon: Shield,
    description: "Vaccination schedules & reminders"
  },
  {
    title: "Health Records",
    href: "/dashboard/records",
    icon: FileText,
    description: "Manage your health documents"
  },
  {
    title: "Medicines",
    href: "/dashboard/medicines",
    icon: Pill,
    description: "Prescriptions & medicine info"
  },
  {
    title: "Health Tips",
    href: "/dashboard/tips",
    icon: BookOpen,
    description: "Articles & wellness tips"
  },
  {
    title: "Appointments",
    href: "/dashboard/appointments",
    icon: Calendar,
    description: "Book & manage appointments"
  },
  {
    title: "Profile & Settings",
    href: "/dashboard/profile",
    icon: User,
    description: "Manage your account"
  }
];

const adminMenuItems = [
  {
    title: "Manage Users",
    href: "/admin/users",
    icon: Users,
    description: "View & manage users"
  },
  {
    title: "Knowledge Base",
    href: "/admin/knowledge",
    icon: Database,
    description: "Update medical content"
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "User activity & trends"
  },
  {
    title: "Chat Logs",
    href: "/admin/chatlogs",
    icon: MessageSquare,
    description: "Review user queries"
  },
  {
    title: "Vaccination Data",
    href: "/admin/vaccination-data",
    icon: Shield,
    description: "Manage vaccination info"
  },
  {
    title: "System Settings",
    href: "/admin/settings",
    icon: Settings,
    description: "Platform configuration"
  }
];

export const Sidebar = ({ isOpen, onToggle, userRole = 'user' }: SidebarProps) => {
  const location = useLocation();
  const menuItems = userRole === 'admin' ? adminMenuItems : userMenuItems;

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-card/95 backdrop-blur-glass border-r border-border transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        isOpen ? "w-72" : "w-0 lg:w-16"
      )}>
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className={cn(
              "flex items-center gap-3 transition-opacity duration-200",
              !isOpen && "lg:opacity-0"
            )}>
              <div className="w-8 h-8 bg-gradient-medical-primary rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">HealthBot</h2>
                <p className="text-xs text-muted-foreground">Your Health Companion</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="lg:hidden"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative",
                      active 
                        ? "bg-primary text-primary-foreground shadow-medical" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                    onClick={() => onToggle()}
                  >
                    <Icon className={cn(
                      "w-5 h-5 flex-shrink-0 transition-transform duration-200",
                      active && "text-primary-foreground",
                      "group-hover:scale-110"
                    )} />
                    <div className={cn(
                      "transition-opacity duration-200 overflow-hidden",
                      !isOpen && "lg:opacity-0 lg:w-0"
                    )}>
                      <span className="block font-medium">{item.title}</span>
                      <span className={cn(
                        "block text-xs opacity-75 mt-0.5",
                        active ? "text-primary-foreground/80" : "text-muted-foreground"
                      )}>
                        {item.description}
                      </span>
                    </div>
                    
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute right-2 w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <div className={cn(
              "flex items-center gap-3 text-xs text-muted-foreground transition-opacity duration-200",
              !isOpen && "lg:opacity-0"
            )}>
              <Bell className="w-4 h-4" />
              <span>Notifications enabled</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};