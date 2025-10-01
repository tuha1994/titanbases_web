import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { PartnersManager } from "@/components/admin/partners-manager"

export default async function AdminPartnersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/admin/login")
  }

  const { data: partners } = await supabase.from("partners").select("*").order("display_order")

  return (
    <div className="min-h-screen bg-black">
      <AdminNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Partners</h1>
          <p className="text-gray-400">Manage partner logos and information</p>
        </div>
        <PartnersManager initialPartners={partners || []} />
      </main>
    </div>
  )
}
