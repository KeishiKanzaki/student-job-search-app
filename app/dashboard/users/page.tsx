import { DashboardNav } from "@/components/dashboard-nav"
import { UserSearch } from "@/components/user-search"
import { mockProfiles } from "@/lib/mock-data"

// Mock user data for UI display
export default function UsersPage() {
  const user = {
    id: "demo-user-1",
    email: "student@mail.kyutech.jp",
    full_name: "デモユーザー",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">ユーザーを探す</h2>
          <p className="text-muted-foreground">OB/OGや現役生と繋がりましょう</p>
        </div>
        <UserSearch initialProfiles={mockProfiles} currentUserId={user.id} />
      </main>
    </div>
  )
}
