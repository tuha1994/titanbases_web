import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminNav } from "@/components/admin/admin-nav"
import { ArticlesManager } from "@/components/admin/articles-manager"

export default async function AdminArticlesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/admin/login")
  }

  const { data: articles } = await supabase.from("articles").select("*").order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-black">
      <AdminNav user={user} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Articles</h1>
          <p className="text-gray-400">Create and manage blog articles</p>
        </div>
        <ArticlesManager initialArticles={articles || []} userId={user.id} />
      </main>
    </div>
  )
}
