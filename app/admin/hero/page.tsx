import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { HeroEditor } from "@/components/admin/hero-editor"

export default async function AdminHeroPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/admin/login")
  }

  const { data: heroContent } = await supabase.from("hero_content").select("*").single()

  return (
    <div className="min-h-screen bg-black">
      <AdminNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Hero Section</h1>
          <p className="text-gray-400">Edit the hero section content</p>
        </div>
        <HeroEditor initialData={heroContent} />
      </main>
    </div>
  )
}
