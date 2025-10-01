"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useTheme } from "next-themes"

const filters = [
  { id: "csp", en: "CSP", vi: "CSP" },
  { id: "ai-data", en: "AI & DATA", vi: "AI & DỮ LIỆU" },
  { id: "business", en: "BUSINESS SOLUTION", vi: "GIẢI PHÁP KINH DOANH" },
  { id: "tech", en: "TECHNOLOGY FOUNDATION", vi: "NỀN TẢNG CÔNG NGHỆ" },
]

const partners = [
  { name: "AWS", logo: "/aws-logo.png" },
  { name: "Google Cloud", logo: "/images/partners/google-cloud-logo.png" },
  { name: "Microsoft Azure", logo: "/microsoft-azure-logo.jpg" },
  { name: "Alibaba Cloud", logo: "/alibaba-cloud-logo.png" },
  { name: "Oracle Cloud", logo: "/oracle-cloud-logo.png" },
  { name: "IBM Cloud", logo: "/ibm-cloud-logo.png" },
  { name: "AWS", logo: "/aws-logo.png" },
  { name: "Google Cloud", logo: "/images/partners/google-cloud-logo.png" },
  { name: "Microsoft Azure", logo: "/microsoft-azure-logo.jpg" },
  { name: "Alibaba Cloud", logo: "/alibaba-cloud-logo.png" },
  { name: "Oracle Cloud", logo: "/oracle-cloud-logo.png" },
  { name: "IBM Cloud", logo: "/ibm-cloud-logo.png" },
]

export function PartnersSection() {
  const [activeFilter, setActiveFilter] = useState("csp")
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 6
  const { resolvedTheme } = useTheme()

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerView >= partners.length ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, partners.length - itemsPerView) : prev - 1))
  }

  return (
    <section className="section-partners relative py-24 overflow-hidden bg-background" id="partner">
      {/* Spotlight Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-primary/15 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="text-xs uppercase tracking-widest text-primary font-semibold mb-4">CSP</div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Partners</h2>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-7xl lg:text-8xl font-bold text-primary mb-6"
          >
            12
          </motion.div>
          <p className="text-base lg:text-lg text-foreground/70 leading-relaxed mb-4">
            We partner with the world's leading cloud service providers to deliver exceptional value and innovation to
            our customers.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Chúng tôi hợp tác với các nhà cung cấp dịch vụ cloud hàng đầu thế giới để mang lại giá trị và đổi mới vượt
            trội cho khách hàng.
          </p>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`chip px-6 py-3 rounded-full text-xs uppercase tracking-wider font-medium transition-all ${
                activeFilter === filter.id
                  ? "glass border-primary text-primary shadow-lg shadow-primary/20"
                  : // Replace hardcoded colors with theme-aware classes
                    "bg-muted/50 border-border text-muted-foreground hover:text-foreground hover:border-border/80"
              }`}
            >
              {filter.en}
            </button>
          ))}
        </motion.div>

        <div className="relative mb-12">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass border-border hover:border-primary/50 transition-all"
            aria-label="Previous partners"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full glass border-border hover:border-primary/50 transition-all"
            aria-label="Next partners"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden px-12">
            <motion.div
              className="flex gap-8"
              animate={{ x: `-${currentIndex * (100 / itemsPerView)}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {partners.map((partner, index) => (
                <motion.div
                  key={`${partner.name}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl p-6 flex items-center justify-center hover:border-primary/50 transition-all flex-shrink-0"
                  style={{ width: `calc(${100 / itemsPerView}% - 2rem)` }}
                >
                  <img
                    src={partner.logo || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-full h-16 object-contain opacity-70 hover:opacity-100 transition-opacity"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-border text-foreground hover:border-primary hover:text-primary transition-all bg-transparent"
            asChild
          >
            <a href="#competency">
              Learn More / Tìm hiểu thêm
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
