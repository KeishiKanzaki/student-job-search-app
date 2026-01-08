"use client"

import { DashboardNav } from "@/components/dashboard-nav"
import { DashboardHome } from "@/components/dashboard-home"

// Mock user data for UI display
export default function DashboardPage() {
  const user = {
    id: "demo-user-1",
    email: "student@mail.kyutech.jp",
    full_name: "デモユーザー",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <DashboardHome user={user} />
      </main>
    </div>
  )
}
