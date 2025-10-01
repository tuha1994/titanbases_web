"use client"

import type React from "react"

import { motion } from "framer-motion"
import { ArrowRight, Cloud, Shield, Sparkles, HeadphonesIcon, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Shield,
  Sparkles,
  HeadphonesIcon,
  TrendingUp,
}

interface HeroContent {
  title_en: string
  title_vi: string
  subtitle_en: string
  subtitle_vi: string
  description_en: string
  description_vi: string
  cta_primary_text_en: string
  cta_primary_text_vi: string
  cta_primary_url: string
  cta_secondary_text_en: string
  cta_secondary_text_vi: string
  cta_secondary_url: string
}

interface FeatureCard {
  title_en: string
  title_vi: string
  description_en: string
  description_vi: string
  icon_name: string
}

interface HeroSectionProps {
  heroContent: HeroContent | null
  features: FeatureCard[]
}

export function HeroSection({ heroContent, features }: HeroSectionProps) {
  const { language } = useLanguage()

  const content = heroContent || {
    title_en: "Vietnam-Built. World-Scale Cloud.",
    title_vi: "Xây dựng tại Việt Nam. Cloud Quy mô Thế giới.",
    subtitle_en: "Secure, scalable infrastructure. Backed by leading cloud partners.",
    subtitle_vi: "Hạ tầng an toàn, mở rộng linh hoạt. Hậu thuẫn bởi các đối tác cloud hàng đầu.",
    description_en: "",
    description_vi: "",
    cta_primary_text_en: "Contact Us",
    cta_primary_text_vi: "Liên hệ",
    cta_primary_url: "#contact",
    cta_secondary_text_en: "View Case Studies",
    cta_secondary_text_vi: "Xem case study",
    cta_secondary_url: "#insights",
  }

  return (
    <section className="section-hero relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden" id="cloud">
      {/* Spotlight Background */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-accent/20 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-secondary/20 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  {language === "en" ? content.title_en : content.title_vi}
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed text-pretty max-w-xl">
                {language === "en" ? content.subtitle_en : content.subtitle_vi}
              </p>
              {content.description_en && (
                <p className="text-base text-muted-foreground/70 leading-relaxed text-pretty max-w-xl">
                  {language === "en" ? content.description_en : content.description_vi}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => {
                const Icon = iconMap[feature.icon_name] || Cloud
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="glass rounded-2xl p-6 hover:border-primary/50 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-1">
                          {language === "en" ? feature.title_en : feature.title_vi}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {language === "en" ? feature.description_en : feature.description_vi}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-black font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all"
                asChild
              >
                <a href={content.cta_primary_url}>
                  {language === "en" ? content.cta_primary_text_en : content.cta_primary_text_vi}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:border-primary hover:text-primary transition-all bg-transparent"
                asChild
              >
                <a href={content.cta_secondary_url}>
                  {language === "en" ? content.cta_secondary_text_en : content.cta_secondary_text_vi}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Block - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[500px] lg:h-[600px]"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/3d-cloud-infrastructure-with-server-stacks-and-dat.jpg"
                alt="Cloud Infrastructure"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
