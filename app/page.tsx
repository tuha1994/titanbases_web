import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { CompetencySection } from "@/components/sections/competency-section"
import { InsightsSection } from "@/components/sections/insights-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <HeroSection />
        <PartnersSection />
        <CompetencySection />
        <InsightsSection />
      </main>
      <Footer />
    </div>
  )
}
