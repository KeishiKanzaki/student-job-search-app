import { use } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserProfile } from "@/components/user-profile"
import { mockProfiles, mockReviews, mockCompanies } from "@/lib/mock-data"

interface UserPageProps {
  params: Promise<{
    id: string
  }>
}

// Mock user data for UI display
export default function UserPage({ params }: UserPageProps) {
  const { id } = use(params)

  const user = {
    id: "demo-user-1",
    email: "student@mail.kyutech.jp",
    full_name: "デモユーザー",
  }

  const profile = mockProfiles.find((p) => p.id === id)

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <DashboardNav user={user} />
        <main className="container mx-auto px-4 py-8">
          <p>ユーザーが見つかりませんでした</p>
        </main>
      </div>
    )
  }

  const reviews = mockReviews
    .filter((r) => r.user_id === id)
    .map((r) => ({
      ...r,
      companies: mockCompanies.find((c) => c.id === r.company_id) || null,
    }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <UserProfile profile={profile} reviews={reviews} currentUserId={user.id} />
      </main>
    </div>
  )
}
