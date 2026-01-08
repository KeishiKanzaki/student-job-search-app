import { DashboardNav } from "@/components/dashboard-nav"
import { ProfileManagement } from "@/components/profile-management"
import { mockReviews, mockCompanies, mockMessages } from "@/lib/mock-data"

// Mock user data for UI display
export default function ProfilePage() {
  const user = {
    id: "demo-user-1",
    email: "student@mail.kyutech.jp",
    full_name: "デモユーザー",
  }

  const profile = {
    id: user.id,
    email: user.email,
    full_name: user.full_name || null,
    student_id: null,
    department: null,
    faculty: null,
    graduation_year: null,
    is_alumni: false,
    bio: null,
    location: null,
    points: 0,
    user_tags: [],
  }

  const reviews = mockReviews
    .filter((r) => r.user_id === user.id)
    .map((r) => ({
      ...r,
      companies: mockCompanies.find((c) => c.id === r.company_id) || null,
    }))

  const messages = mockMessages.filter((m) => m.sender_id === user.id || m.receiver_id === user.id)

  const unreadCount = messages.filter((msg) => msg.receiver_id === user.id && !msg.is_read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <ProfileManagement
          user={user}
          profile={profile}
          reviews={reviews}
          unreadCount={unreadCount}
          messagesCount={messages.length}
        />
      </main>
    </div>
  )
}
