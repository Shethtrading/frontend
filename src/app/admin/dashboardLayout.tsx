'use client'

import { useState } from 'react'
import { Bell, ChevronDown, HelpCircle, LayoutDashboard, LogOut, MessageSquare, Package, Settings, User, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-56' : 'w-16'
        } bg-gray-800 text-gray-100 transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex h-14 items-center justify-between px-3">
          <h1 className={`text-lg font-semibold ${isSidebarOpen ? 'block' : 'hidden'}`}>Dashboard</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            className="text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${isSidebarOpen ? 'rotate-90' : '-rotate-90'}`} />
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {[
            { icon: LayoutDashboard, label: 'Dashboard' },
            { icon: MessageSquare, label: 'Enquiry' },
            { icon: Package, label: 'Products' },
            { icon: Users, label: 'Users' },
            { icon: Settings, label: 'Customize' },
          ].map((item, index) => (
            <Button key={index} variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
              <item.icon className="mr-2 h-4 w-4" />
              {isSidebarOpen && item.label}
            </Button>
          ))}
        </nav>
        <div className="p-2">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white">
            <HelpCircle className="mr-2 h-4 w-4" />
            {isSidebarOpen && 'Help'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex h-14 items-center justify-end bg-white px-4 shadow-sm">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        {children}
        
      </div>
    </div>
  )
}