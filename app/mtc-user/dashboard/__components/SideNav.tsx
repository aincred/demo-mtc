// app/mtc-user/dashboard/__components/SideNav.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Users,
  Settings,
  X,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SideNavProps {
  setSidebarOpen: (open: boolean) => void;
}

const navigation = [
  { name: "Dashboard", href: "/mtc-user/dashboard/home", icon: Home },
  { name: "Users", href: "/dashboard/users", icon: Users }, 
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function SideNav({ setSidebarOpen }: SideNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear any authentication tokens or user data
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("userSession");
    
    // Redirect to login page
    router.push("/");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Logo and close button */}
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="shrink-0">
            <h1 className="text-xl font-bold text-indigo-600">MTC Dashboard</h1>
          </div>
        </div>
        <button
          type="button"
          className="lg:hidden -mr-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          onClick={() => setSidebarOpen(false)}
        >
          <span className="sr-only">Close sidebar</span>
          <X className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                isActive
                  ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-800",
                "group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150"
              )}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon
                className={cn(
                  isActive ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500",
                  "mr-3 h-5 w-5 transition-colors duration-150"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        })}
        
        {/* Logout button */}
        <button
          onClick={handleLogout}
          className="group flex items-center px-3 py-2 text-sm font-medium border-l-4 rounded-r-md transition-colors duration-150 border-transparent text-red-600 hover:bg-red-50 hover:text-red-700 w-full text-left"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-500 group-hover:text-red-600 transition-colors duration-150" aria-hidden="true" />
          Logout
        </button>
      </nav>

      {/* User profile section */}
      <div className="shrink-0 flex border-t border-gray-200 p-4">
        <div className="shrink-0 w-full group block">
          <div className="flex items-center">
            <div className="shrink-0 bg-indigo-100 rounded-full h-9 w-9 flex items-center justify-center">
              <User className="h-5 w-5 text-indigo-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">MTC Chaibasa</p>
              <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                View profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}