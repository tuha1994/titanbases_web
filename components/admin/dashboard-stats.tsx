"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Award, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export function DashboardStats() {
  const [stats, setStats] = useState({
    articles: 0,
    partners: 0,
    certifications: 0,
    contacts: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient()

      const [articlesResult, partnersResult, certificationsResult, contactsResult] = await Promise.all([
        supabase.from("articles").select("id", { count: "exact", head: true }),
        supabase.from("partners").select("id", { count: "exact", head: true }),
        supabase.from("certifications").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      ])

      setStats({
        articles: articlesResult.count || 0,
        partners: partnersResult.count || 0,
        certifications: certificationsResult.count || 0,
        contacts: contactsResult.count || 0,
      })
    }

    fetchStats()
  }, [])

  const statCards = [
    { title: "Total Articles", value: stats.articles, icon: FileText, color: "text-teal-400" },
    { title: "Partners", value: stats.partners, icon: Users, color: "text-purple-400" },
    { title: "Certifications", value: stats.certifications, icon: Award, color: "text-blue-400" },
    { title: "Contact Submissions", value: stats.contacts, icon: Mail, color: "text-green-400" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {statCards.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">{stat.title}</CardTitle>
              <Icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
