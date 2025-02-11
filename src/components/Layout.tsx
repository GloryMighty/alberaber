
import { Bell, Home, MessageSquare, Users, Calendar, User, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import NeonMaze from "@/components/ui/NeonMaze";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: Users, label: "Network", href: "/network" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarContent>
            <div className="px-3 py-4">
              <div className="mb-8 w-48 h-16">
                <NeonMaze text="DigiCard" width="w-full" height="h-full" />
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                      location.pathname === item.href
                        ? "bg-social-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className={`w-5 h-5 mr-3 ${
                      location.pathname === item.href ? "text-white" : "text-social-primary"
                    }`} />
                    <span>{item.label}</span>
                  </Link>
                ))}
                <button
                  onClick={signOut}
                  className="w-full flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-5 h-5 mr-3 text-social-primary" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1">
          <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6">
            <SidebarTrigger />
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5 text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <div className="w-8 h-8 rounded-full bg-social-primary text-white flex items-center justify-center">
                  {useAuth().user?.email?.charAt(0).toUpperCase()}
                </div>
              </Button>
            </div>
          </header>
          <main className="p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
