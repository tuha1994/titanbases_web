"use client"

import { motion } from "framer-motion"
import { ArrowRight, Cloud, Shield, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const features = [
  {
    icon: Cloud,
    en: "Cloud Migration & Modernization",
    vi: "Di chuyển & Hiện đại hóa Cloud",
  },
  {
    icon: Shield,
    en: "Secured Dev & Operations at Scale",
    vi: "Phát triển & Vận hành An toàn Quy mô lớn",
  },
  {
    icon: Sparkles,
    en: "Data & GenAI Innovations",
    vi: "Đổi mới Dữ liệu & GenAI",
  },
]

export function HeroSection() {
  return (
    <section className="section-hero relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden" id="cloud">
      {/* Spotlight Background */}
      <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-gradient-radial from-accent/20 via-primary/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-secondary/20 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Block - Content */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
                <span className="text-white">Vietnam-Built.</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  World-Scale Cloud.
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-white/70 leading-relaxed text-pretty max-w-xl">
                Secure, scalable infrastructure. Backed by leading cloud partners.
              </p>
              <p className="text-base text-white/50 leading-relaxed text-pretty max-w-xl">
                Hạ tầng an toàn, mở rộng linh hoạt. Hậu thuẫn bởi các đối tác cloud hàng đầu.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="glass rounded-2xl p-6 hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 group-hover:from-primary/30 group-hover:to-secondary/30 transition-all">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">{feature.en}</h3>
                      <p className="text-sm text-white/60">{feature.vi}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
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
                <a href="#contact">
                  Contact Us / Liên hệ
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:border-primary hover:text-primary transition-all bg-transparent"
                asChild
              >
                <a href="#insights">View Case Studies / Xem case study</a>
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
