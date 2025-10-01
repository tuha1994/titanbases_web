"use client"

import { useState } from "react"
import { Globe, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navItems = [
  { en: "AI & DATA", vi: "AI & DỮ LIỆU", href: "#ai-data" },
  { en: "CLOUD", vi: "CLOUD", href: "#cloud" },
  { en: "SECURITY", vi: "BẢO MẬT", href: "#security" },
  { en: "PRODUCT", vi: "SẢN PHẨM", href: "#product" },
  { en: "PARTNER", vi: "ĐỐI TÁC", href: "#partner" },
  { en: "CUSTOMER", vi: "KHÁCH HÀNG", href: "#customer" },
  { en: "ABOUT US", vi: "VỀ CHÚNG TÔI", href: "#about" },
  { en: "CONTACT", vi: "LIÊN HỆ", href: "#contact" },
]

export function Header() {
  const [language, setLanguage] = useState<"en" | "vi">("en")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#cloud" className="text-xl font-bold tracking-tight">
              <span className="text-primary">Titanbases</span>
              <span className="text-white/90"> Cloud</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-wider text-white/50 hover:text-white/90 transition-colors uppercase"
              >
                {language === "en" ? item.en : item.vi}
              </a>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-white/70 hover:text-white">
                  <Globe className="h-4 w-4" />
                  <span className="uppercase text-xs font-medium">{language}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/95 border-white/10">
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className="text-white/70 hover:text-white focus:text-white"
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("vi")}
                  className="text-white/70 hover:text-white focus:text-white"
                >
                  Tiếng Việt
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wide"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {language === "en" ? item.en : item.vi}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
