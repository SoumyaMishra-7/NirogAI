import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole?: 'user' | 'admin';
}

export const DashboardLayout = ({ 
  children, 
  userRole = 'user'
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen w-full bg-background">
      <div className="flex h-screen overflow-hidden">
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          userRole={userRole}
        />
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <Navbar 
            onSidebarToggle={toggleSidebar}
            userRole={userRole}
          />
          
          <main className="flex-1 overflow-y-auto bg-muted/30">
            <div className="container mx-auto p-4 lg:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
