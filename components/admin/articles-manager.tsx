"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Edit } from "lucide-react"

interface Article {
  id: string
  title_en: string
  title_vi: string
  slug: string
  excerpt_en: string
  excerpt_vi: string
  content_en: string
  content_vi: string
  featured_image_url: string | null
  category: string
  is_published: boolean
  published_at: string | null
  created_at: string
}

interface ArticlesManagerProps {
  initialArticles: Article[]
  userId: string
}

export function ArticlesManager({ initialArticles, userId }: ArticlesManagerProps) {
  const router = useRouter()
  const [articles, setArticles] = useState(initialArticles)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title_en: "",
    title_vi: "",
    slug: "",
    excerpt_en: "",
    excerpt_vi: "",
    content_en: "",
    content_vi: "",
    featured_image_url: "",
    category: "blog",
    is_published: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      const dataToSave = {
        ...formData,
        author_id: userId,
        published_at: formData.is_published ? new Date().toISOString() : null,
      }

      if (editingId) {
        await supabase.from("articles").update(dataToSave).eq("id", editingId)
      } else {
        await supabase.from("articles").insert(dataToSave)
      }

      setIsAdding(false)
      setEditingId(null)
      setFormData({
        title_en: "",
        title_vi: "",
        slug: "",
        excerpt_en: "",
        excerpt_vi: "",
        content_en: "",
        content_vi: "",
        featured_image_url: "",
        category: "blog",
        is_published: false,
      })
      router.refresh()
    } catch (error) {
      console.error("Error saving article:", error)
      alert("Failed to save article")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    const supabase = createClient()
    await supabase.from("articles").delete().eq("id", id)
    router.refresh()
  }

  const handleEdit = (article: Article) => {
    setEditingId(article.id)
    setFormData({
      title_en: article.title_en,
      title_vi: article.title_vi,
      slug: article.slug,
      excerpt_en: article.excerpt_en,
      excerpt_vi: article.excerpt_vi,
      content_en: article.content_en,
      content_vi: article.content_vi,
      featured_image_url: article.featured_image_url || "",
      category: article.category,
      is_published: article.is_published,
    })
    setIsAdding(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setIsAdding(!isAdding)
            setEditingId(null)
            setFormData({
              title_en: "",
              title_vi: "",
              slug: "",
              excerpt_en: "",
              excerpt_vi: "",
              content_en: "",
              content_vi: "",
              featured_image_url: "",
              category: "blog",
              is_published: false,
            })
          }}
          className="gap-2 bg-teal-500 hover:bg-teal-600"
        >
          <Plus className="h-4 w-4" />
          New Article
        </Button>
      </div>

      {isAdding && (
        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Tabs defaultValue="en">
                <TabsList>
                  <TabsTrigger value="en">English</TabsTrigger>
                  <TabsTrigger value="vi">Tiếng Việt</TabsTrigger>
                </TabsList>

                <TabsContent value="en" className="space-y-4">
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
                    <Label htmlFor="excerpt_en" className="text-white">
                      Excerpt
                    </Label>
                    <Textarea
                      id="excerpt_en"
                      value={formData.excerpt_en}
                      onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      rows={2}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content_en" className="text-white">
                      Content
                    </Label>
                    <Textarea
                      id="content_en"
                      value={formData.content_en}
                      onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      rows={10}
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="vi" className="space-y-4">
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
                    <Label htmlFor="excerpt_vi" className="text-white">
                      Trích dẫn
                    </Label>
                    <Textarea
                      id="excerpt_vi"
                      value={formData.excerpt_vi}
                      onChange={(e) => setFormData({ ...formData, excerpt_vi: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      rows={2}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="content_vi" className="text-white">
                      Nội dung
                    </Label>
                    <Textarea
                      id="content_vi"
                      value={formData.content_vi}
                      onChange={(e) => setFormData({ ...formData, content_vi: e.target.value })}
                      className="border-white/20 bg-white/5 text-white"
                      rows={10}
                      required
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="slug" className="text-white">
                    Slug (URL)
                  </Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="border-white/20 bg-white/5 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-white">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="border-white/20 bg-white/5 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blog">Blog</SelectItem>
                      <SelectItem value="news">News</SelectItem>
                      <SelectItem value="case-study">Case Study</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="featured_image_url" className="text-white">
                  Featured Image URL
                </Label>
                <Input
                  id="featured_image_url"
                  value={formData.featured_image_url}
                  onChange={(e) => setFormData({ ...formData, featured_image_url: e.target.value })}
                  className="border-white/20 bg-white/5 text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="is_published" className="text-white">
                  Publish Article
                </Label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                  {editingId ? "Update" : "Create"} Article
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false)
                    setEditingId(null)
                  }}
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {articles.map((article) => (
          <Card key={article.id} className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-white">{article.title_en}</h3>
                    {article.is_published ? (
                      <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs text-green-400">Published</span>
                    ) : (
                      <span className="rounded-full bg-gray-500/20 px-2 py-1 text-xs text-gray-400">Draft</span>
                    )}
                  </div>
                  <p className="mb-2 text-sm text-gray-400">{article.excerpt_en}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{article.category}</span>
                    <span>•</span>
                    <span>{new Date(article.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(article)}
                    className="gap-2 border-white/20 text-white hover:bg-white/10"
                  >
                    <Edit className="h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(article.id)}
                    className="gap-2 border-red-500/20 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
