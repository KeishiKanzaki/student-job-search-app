import { DashboardNav } from "@/components/dashboard-nav"
import { CompanySearch } from "@/components/company-search"
import { mockCompanies } from "@/lib/mock-data"

// Mock user data for UI display
export default function CompaniesPage() {
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
          <h2 className="text-3xl font-bold mb-2">企業を探す</h2>
          <p className="text-muted-foreground">企業レビューを検索・閲覧できます</p>
        </div>
        <CompanySearch initialCompanies={mockCompanies} />
      </main>
    </div>
  )
}
