"use client"

import { useState } from "react"
import { Globe, ChevronDown, Menu, X, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"

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
  const { theme, setTheme } = useTheme()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="#cloud" className="text-xl font-bold tracking-tight">
              <span className="text-primary">Titanbases</span>
              <span className="text-foreground/90"> Cloud</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs font-medium tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase"
              >
                {language === "en" ? item.en : item.vi}
              </a>
            ))}
          </nav>

          {/* Language Switcher & Theme Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                  <Globe className="h-4 w-4" />
                  <span className="uppercase text-xs font-medium">{language}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-popover border-border">
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className="text-muted-foreground hover:text-foreground focus:text-foreground"
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("vi")}
                  className="text-muted-foreground hover:text-foreground focus:text-foreground"
                >
                  Tiếng Việt
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide"
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
