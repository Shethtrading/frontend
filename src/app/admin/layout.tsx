"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Settings,
  User,
  Mails,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import ThemeSwitch from "@/components/themeSwitch";
import AdminAccess from "@/components/adminaccess";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  // Ensure theme is only toggled on the client side
  useEffect(() => {
    setTheme("light");
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-56" : "w-16"
        } bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 transition-all duration-300 ease-in-out flex flex-col border-r border-gray-200 dark:border-gray-700`}
      >
        <div className="flex h-14 items-center justify-between px-3 border-b border-gray-200 dark:border-gray-700">
          <h1
            className={`text-lg font-semibold ${
              isSidebarOpen ? "block" : "hidden"
            }`}
          >
            Dashboard
          </h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <ChevronDown
              className={`h-5 w-5 transition-transform ${
                isSidebarOpen ? "rotate-90" : "-rotate-90"
              }`}
            />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {[
            { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
            { icon: MessageSquare, label: "Enquiry", path: "/admin/enquiry" },
            { icon: Mails, label: "Contact", path: "/admin/contact" },
          ].map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full justify-start text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
              onClick={() => navigateTo(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {isSidebarOpen && item.label}
            </Button>
          ))}
        </nav>
        <div className="p-2 border-t border-gray-200 dark:border-gray-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200"
            onClick={() => navigateTo("/help")}
          >
            <HelpCircle className="mr-2 h-4 w-4" />
            {isSidebarOpen && "Help"}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex h-14 items-center justify-between bg-white dark:bg-gray-800 px-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2"></div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <ThemeSwitch />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full bg-muted-foreground"
                >
                  <img
                    src="/placeholder.svg?height=32&width=32"
                    alt="User avatar"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john.doe@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigateTo("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigateTo("/settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigateTo("/logout")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <AdminAccess>{children}</AdminAccess>
        </main>
      </div>
    </div>
  );
}
