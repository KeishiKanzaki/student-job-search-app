import { use } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { CompanyDetail } from "@/components/company-detail"
import { mockCompanies, mockReviews } from "@/lib/mock-data"

interface CompanyPageProps {
  params: Promise<{
    id: string
  }>
}

// Mock user data for UI display
export default function CompanyPage({ params }: CompanyPageProps) {
  const { id } = use(params)

  const user = {
    id: "demo-user-1",
    email: "student@mail.kyutech.jp",
    full_name: "デモユーザー",
  }

  const company = mockCompanies.find((c) => c.id === id)

  if (!company) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
        <DashboardNav user={user} />
        <main className="container mx-auto px-4 py-8">
          <p>企業が見つかりませんでした</p>
        </main>
      </div>
    )
  }

  const reviews = mockReviews
    .filter((r) => r.company_id === id)
    .map((r) => ({
      ...r,
      profiles: {
        full_name: "山田 太郎",
        department: "情報工学部",
        graduation_year: 2024,
        is_alumni: true,
      },
    }))

  const locations = [
    {
      id: "loc-1",
      company_id: id,
      address: "東京都渋谷区",
      city: "東京都",
      prefecture: "東京都",
      latitude: 35.6586,
      longitude: 139.7454,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <CompanyDetail company={company} reviews={reviews} locations={locations} userId={user.id} />
      </main>
    </div>
  )
}
