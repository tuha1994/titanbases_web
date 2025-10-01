"use client"

import { motion } from "framer-motion"
import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const filters = [
  { id: "aws", label: "AWS" },
  { id: "ms", label: "MS" },
  { id: "gcp", label: "GCP" },
  { id: "isv", label: "ISV" },
]

const certifications = [
  {
    provider: "aws",
    name: "AWS DevOps Services Competency",
    image: "/aws-devops-badge.jpg",
  },
  {
    provider: "aws",
    name: "AWS Migration Competency",
    image: "/aws-migration-badge.jpg",
  },
  {
    provider: "aws",
    name: "AWS Data & Analytics Competency",
    image: "/aws-data-analytics-badge.jpg",
  },
  {
    provider: "ms",
    name: "Microsoft Azure Expert MSP",
    image: "/microsoft-azure-expert-badge.jpg",
  },
  {
    provider: "ms",
    name: "Microsoft Solutions Partner",
    image: "/microsoft-solutions-partner-badge.jpg",
  },
  {
    provider: "gcp",
    name: "Google Cloud Partner",
    image: "/google-cloud-partner-badge.jpg",
  },
  {
    provider: "gcp",
    name: "Google Cloud Infrastructure",
    image: "/google-cloud-infrastructure-badge.jpg",
  },
  {
    provider: "isv",
    name: "ISV Technology Partner",
    image: "/isv-partner-badge.jpg",
  },
]

export function CompetencySection() {
  const [activeFilter, setActiveFilter] = useState("aws")
  const carouselRef = useRef<HTMLDivElement>(null)

  const filteredCerts = certifications.filter((cert) => cert.provider === activeFilter)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 300
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="section-competency relative py-24 overflow-hidden" id="competency">
      {/* Spotlight Background */}
      <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-gradient-radial from-secondary/20 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-balance">Certification / Competency</h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`chip px-8 py-3 rounded-full text-sm uppercase tracking-wider font-semibold transition-all ${
                  activeFilter === filter.id
                    ? "glass border-primary text-primary shadow-lg shadow-primary/30"
                    : "bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:border-border/80"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Gradient Fades */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass hover:border-primary/50 text-foreground"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass hover:border-primary/50 text-foreground"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Carousel Container */}
          <div
            ref={carouselRef}
            className="carousel flex gap-6 overflow-x-auto scrollbar-hide py-8 px-4 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {filteredCerts.map((cert, index) => (
              <motion.div
                key={`${cert.provider}-${index}`}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card flex-shrink-0 w-64 snap-center"
              >
                <div className="glass rounded-2xl p-8 flex flex-col items-center gap-4 hover:border-primary/50 transition-all h-full">
                  <div className="w-40 h-40 flex items-center justify-center">
                    <img
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-sm text-center text-foreground/80 font-medium leading-relaxed">{cert.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
