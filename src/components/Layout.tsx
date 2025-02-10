
import { Bell, Home, MessageSquare, Users, Calendar, User, LogOut } from "lucide-react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Calendar, label: "Events", href: "/events" },
  { icon: Users, label: "Network", href: "/network" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const { signOut } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarContent>
            <div className="px-3 py-4">
              <h1 className="text-2xl font-bold text-social-primary mb-8">DigiCard</h1>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <item.icon className="w-5 h-5 mr-3 text-social-primary" />
                    <span>{item.label}</span>
                  </a>
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
                  B
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
