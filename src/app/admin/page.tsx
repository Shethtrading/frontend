"use client";

import {
  LayoutDashboard,
  MessageSquare,
  Package,
  Users,
} from "lucide-react";
import DashboardLayout from "./dashboardLayout";

export default function Dashboard() {

  return (
    <DashboardLayout>
      {/* Main Content */}
      <div className="flex flex-1 flex-col">

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Welcome, John Doe
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Total Users", value: "1,234", icon: Users },
              { title: "New Enquiries", value: "56", icon: MessageSquare },
              { title: "Product Sales", value: "89k", icon: Package },
              { title: "Revenue", value: "$12,345", icon: LayoutDashboard },
            ].map((item, index) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {item.title}
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {item.value}
                    </p>
                  </div>
                  <div className="rounded-full p-2 bg-gray-100">
                    <item.icon className="h-5 w-5 text-gray-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">
                Recent Activity
              </h3>
              <ul className="space-y-3">
                {[
                  { action: "New user registered", time: "2 minutes ago" },
                  {
                    action: 'Product "Wireless Earbuds" sold out',
                    time: "1 hour ago",
                  },
                  { action: "New enquiry received", time: "3 hours ago" },
                  {
                    action: "Monthly report generated",
                    time: "Yesterday at 11:30 PM",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-600">{item.action}</span>
                    <span className="text-gray-400">{item.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <h3 className="mb-3 text-lg font-semibold text-gray-800">
                Top Products
              </h3>
              <ul className="space-y-3">
                {[
                  { name: "Wireless Earbuds", sales: 1234 },
                  { name: "Smart Watch", sales: 987 },
                  { name: "Bluetooth Speaker", sales: 856 },
                  { name: "Laptop Stand", sales: 753 },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-600">{item.name}</span>
                    <span className="font-medium text-gray-900">
                      {item.sales} sales
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
