"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface HeroContent {
  id: string
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

interface HeroEditorProps {
  initialData: HeroContent | null
}

export function HeroEditor({ initialData }: HeroEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<HeroContent>(
    initialData || {
      id: "",
      title_en: "",
      title_vi: "",
      subtitle_en: "",
      subtitle_vi: "",
      description_en: "",
      description_vi: "",
      cta_primary_text_en: "",
      cta_primary_text_vi: "",
      cta_primary_url: "",
      cta_secondary_text_en: "",
      cta_secondary_text_vi: "",
      cta_secondary_url: "",
    },
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const supabase = createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    try {
      if (initialData) {
        await supabase
          .from("hero_content")
          .update({ ...formData, updated_by: user?.id })
          .eq("id", initialData.id)
      } else {
        await supabase.from("hero_content").insert({ ...formData, updated_by: user?.id })
      }

      router.refresh()
      alert("Hero content updated successfully!")
    } catch (error) {
      console.error("Error updating hero content:", error)
      alert("Failed to update hero content")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white">Edit Hero Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="en" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="en">English</TabsTrigger>
              <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
            </TabsList>

            <TabsContent value="en" className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title_en" className="text-white">
                    Title
                  </Label>
                  <Input
                    id="title_en"
                    value={formData.title_en}
                    onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                    className="border-white/20 bg-white/5 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle_en" className="text-white">
                    Subtitle
                  </Label>
                  <Input
                    id="subtitle_en"
                    value={formData.subtitle_en}
                    onChange={(e) => setFormData({ ...formData, subtitle_en: e.target.value })}
                    className="border-white/20 bg-white/5 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description_en" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="description_en"
                    value={formData.description_en}
                    onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                    className="border-white/20 bg-white/5 text-white"
                    rows={4}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="cta_primary_text_en" className="text-white">
                      Primary CTA Text
                    </Label>
                    <Input
                      id="cta_primary_text_en"
                      value={formData.cta_primary_text_en}
                      onChange={(e) => setFormData({ ...formData, cta_primary_text_en: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta_primary_url" className="text-white">
                      Primary CTA URL
                    </Label>
                    <Input
                      id="cta_primary_url"
                      value={formData.cta_primary_url}
                      onChange={(e) => setFormData({ ...formData, cta_primary_url: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="cta_secondary_text_en" className="text-white">
                      Secondary CTA Text
                    </Label>
                    <Input
                      id="cta_secondary_text_en"
                      value={formData.cta_secondary_text_en}
                      onChange={(e) => setFormData({ ...formData, cta_secondary_text_en: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta_secondary_url" className="text-white">
                      Secondary CTA URL
                    </Label>
                    <Input
                      id="cta_secondary_url"
                      value={formData.cta_secondary_url}
                      onChange={(e) => setFormData({ ...formData, cta_secondary_url: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      required
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vi" className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="title_vi" className="text-white">
                    Tiêu đề
                  </Label>
                  <Input
                    id="title_vi"
                    value={formData.title_vi}
                    onChange={(e) => setFormData({ ...formData, title_vi: e.target.value })}
                    className="border-white/20 bg-white/5 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="subtitle_vi" className="text-white">
                    Phụ đề
                  </Label>
                  <Input
                    id="subtitle_vi"
                    value={formData.subtitle_vi}
                    onChange={(e) => setFormData({ ...formData, subtitle_vi: e.target.value })}
                    className="border-white/20 bg-white/5 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description_vi" className="text-white">
                    Mô tả
                  </Label>
                  <Textarea
                    id="description_vi"
                    value={formData.description_vi}
                    onChange={(e) => setFormData({ ...formData, description_vi: e.target.value })}
                    className="border-white/20 bg-white/5 text-white"
                    rows={4}
                    required
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="cta_primary_text_vi" className="text-white">
                      Văn bản CTA chính
                    </Label>
                    <Input
                      id="cta_primary_text_vi"
                      value={formData.cta_primary_text_vi}
                      onChange={(e) => setFormData({ ...formData, cta_primary_text_vi: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cta_secondary_text_vi" className="text-white">
                      Văn bản CTA phụ
                    </Label>
                    <Input
                      id="cta_secondary_text_vi"
                      value={formData.cta_secondary_text_vi}
                      onChange={(e) => setFormData({ ...formData, cta_secondary_text_vi: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      required
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-teal-500 hover:bg-teal-600">
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
