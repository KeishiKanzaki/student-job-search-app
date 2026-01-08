import { Suspense } from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { MessagingInterface } from "@/components/messaging-interface"
import { mockMessages } from "@/lib/mock-data"

// Mock user data for UI display
export default function MessagesPage() {
  const user = {
    id: "demo-user-1",
    email: "student@mail.kyutech.jp",
    full_name: "デモユーザー",
  }

  const sentMessages = mockMessages.filter((m) => m.sender_id === user.id)
  const receivedMessages = mockMessages.filter((m) => m.receiver_id === user.id)

  const currentProfile = {
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    is_alumni: false,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <DashboardNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading messages...</div>}>
          <MessagingInterface
            currentUserId={user.id}
            sentMessages={sentMessages}
            receivedMessages={receivedMessages}
            currentProfile={currentProfile}
          />
        </Suspense>
      </main>
    </div>
  )
}
