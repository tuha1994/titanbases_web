"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image"
import { LogOut, LayoutDashboard, FileText, Users, Mail } from "lucide-react"
import type { User } from "@supabase/supabase-js"

interface AdminNavProps {
  user: User
}

export function AdminNav({ user }: AdminNavProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/hero", label: "Hero Section", icon: LayoutDashboard },
    { href: "/admin/partners", label: "Partners", icon: Users },
    { href: "/admin/articles", label: "Articles", icon: FileText },
    { href: "/admin/contacts", label: "Contacts", icon: Mail },
  ]

  return (
    <nav className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/admin/dashboard">
              <Image
                src="/images/titanbases-logo.png"
                alt="Titanbases"
                width={120}
                height={48}
                className="h-8 w-auto"
              />
            </Link>
            <div className="flex gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className={`gap-2 ${isActive ? "bg-teal-500/20 text-teal-400" : "text-gray-400 hover:text-white"}`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-gray-400 hover:text-white">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
