import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { DashboardStats } from "@/components/admin/dashboard-stats"

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/admin/login")
  }

  return (
    <div className="min-h-screen bg-black">
      <AdminNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user.email}</p>
        </div>
        <DashboardStats />
      </main>
    </div>
  )
}
