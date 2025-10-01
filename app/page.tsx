import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { CompetencySection } from "@/components/sections/competency-section"
import { InsightsSection } from "@/components/sections/insights-section"
import { ContactSection } from "@/components/sections/contact-section"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient()

  const [heroResult, partnersResult, certificationsResult, articlesResult, featuresResult] = await Promise.all([
    supabase.from("hero_content").select("*").single(),
    supabase.from("partners").select("*").eq("is_active", true).order("display_order"),
    supabase.from("certifications").select("*").eq("is_active", true).order("display_order"),
    supabase.from("articles").select("*").eq("is_published", true).order("published_at", { ascending: false }).limit(6),
    supabase.from("feature_cards").select("*").eq("is_active", true).order("display_order"),
  ])

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroSection heroContent={heroResult.data} features={featuresResult.data || []} />
        <PartnersSection partners={partnersResult.data || []} />
        <CompetencySection certifications={certificationsResult.data || []} />
        <InsightsSection articles={articlesResult.data || []} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
