"use client"

import { motion } from "framer-motion"
import { ExternalLink, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const contentTypes = ["Blog", "Press Release", "Global", "Solution"] as const

const insights = [
  {
    type: "Blog" as const,
    title: "Accelerating Cloud Migration with AI-Powered Tools",
    titleVi: "Tăng tốc Di chuyển Cloud với Công cụ AI",
    image: "/cloud-migration-dashboard-with-ai-analytics.jpg",
    date: "2025-01-15",
  },
  {
    type: "Press Release" as const,
    title: "Titanbases Achieves AWS Premier Tier Services Partner Status",
    titleVi: "Titanbases Đạt Cấp Đối tác Dịch vụ Premier AWS",
    image: "/aws-partnership-announcement.jpg",
    date: "2025-01-10",
  },
  {
    type: "Global" as const,
    title: "Expanding Operations to Southeast Asia Markets",
    titleVi: "Mở rộng Hoạt động tới Thị trường Đông Nam Á",
    image: "/southeast-asia-map-with-technology-nodes.jpg",
    date: "2025-01-05",
  },
  {
    type: "Solution" as const,
    title: "GenAI Solutions for Enterprise Data Analytics",
    titleVi: "Giải pháp GenAI cho Phân tích Dữ liệu Doanh nghiệp",
    image: "/ai-data-analytics-visualization.jpg",
    date: "2024-12-28",
  },
  {
    type: "Blog" as const,
    title: "Best Practices for Multi-Cloud Security Architecture",
    titleVi: "Thực hành Tốt nhất cho Kiến trúc Bảo mật Đa Cloud",
    image: "/multi-cloud-security-architecture-diagram.jpg",
    date: "2024-12-20",
  },
  {
    type: "Solution" as const,
    title: "Kubernetes at Scale: Our Production Journey",
    titleVi: "Kubernetes Quy mô lớn: Hành trình Sản xuất của Chúng tôi",
    image: "/kubernetes-cluster-visualization.jpg",
    date: "2024-12-15",
  },
]

const typeColors = {
  Blog: "from-primary/80 to-accent/80",
  "Press Release": "from-secondary/80 to-primary/80",
  Global: "from-accent/80 to-secondary/80",
  Solution: "from-primary/80 to-secondary/80",
}

export function InsightsSection() {
  return (
    <section className="section-insights relative py-24 overflow-hidden" id="insights">
      {/* Spotlight Background */}
      <div className="absolute top-1/4 left-1/3 w-[900px] h-[900px] bg-gradient-radial from-primary/15 via-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Insights</h2>
          <p className="text-xl text-white/80 mb-2">Transform, Tomorrow, Together</p>
          <p className="text-base text-white/60">Kiến tạo đổi mới cùng ngày mai</p>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {insights.map((insight, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card group cursor-pointer"
            >
              <a href="#insights" className="block h-full">
                <div className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all h-full">
                  {/* Image with Gradient Overlay */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={insight.image || "/placeholder.svg"}
                      alt={insight.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${typeColors[insight.type]} opacity-60`} />

                    {/* Type Label */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-black/50 backdrop-blur-sm text-white border border-white/20">
                        {insight.type}
                      </span>
                    </div>

                    {/* External Link Icon */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
                        <ExternalLink className="h-4 w-4 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-semibold text-white leading-snug group-hover:text-primary transition-colors text-balance">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed text-pretty">{insight.titleVi}</p>
                    <div className="text-xs text-white/40 pt-2">
                      {new Date(insight.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-white hover:border-primary hover:text-primary transition-all bg-transparent"
            asChild
          >
            <a href="#insights">
              View All / Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
