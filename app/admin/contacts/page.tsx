import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { ContactsManager } from "@/components/admin/contacts-manager"

export default async function AdminContactsPage() {
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
          <h1 className="text-3xl font-bold text-white">Contact Submissions</h1>
          <p className="text-gray-400">Manage and respond to contact form submissions</p>
        </div>
        <ContactsManager />
      </main>
    </div>
  )
}
