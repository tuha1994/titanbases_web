"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Edit } from "lucide-react"
import Image from "next/image"

interface Partner {
  id: string
  name: string
  logo_url: string
  category: string
  website_url: string | null
  display_order: number
  is_active: boolean
}

interface PartnersManagerProps {
  initialPartners: Partner[]
}

export function PartnersManager({ initialPartners }: PartnersManagerProps) {
  const router = useRouter()
  const [partners, setPartners] = useState(initialPartners)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
    category: "csp",
    website_url: "",
    display_order: 0,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()

    try {
      if (editingId) {
        await supabase.from("partners").update(formData).eq("id", editingId)
      } else {
        await supabase.from("partners").insert(formData)
      }

      setIsAdding(false)
      setEditingId(null)
      setFormData({ name: "", logo_url: "", category: "csp", website_url: "", display_order: 0 })
      router.refresh()
    } catch (error) {
      console.error("Error saving partner:", error)
      alert("Failed to save partner")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this partner?")) return

    const supabase = createClient()
    await supabase.from("partners").delete().eq("id", id)
    router.refresh()
  }

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id)
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url,
      category: partner.category,
      website_url: partner.website_url || "",
      display_order: partner.display_order,
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
            setFormData({ name: "", logo_url: "", category: "csp", website_url: "", display_order: 0 })
          }}
          className="gap-2 bg-teal-500 hover:bg-teal-600"
        >
          <Plus className="h-4 w-4" />
          Add Partner
        </Button>
      </div>

      {isAdding && (
        <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">
                  Partner Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="border-white/20 bg-white/5 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="logo_url" className="text-white">
                  Logo URL
                </Label>
                <Input
                  id="logo_url"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
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
                    <SelectItem value="csp">Cloud Service Provider</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="consulting">Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="website_url" className="text-white">
                  Website URL
                </Label>
                <Input
                  id="website_url"
                  value={formData.website_url}
                  onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
                  className="border-white/20 bg-white/5 text-white"
                />
              </div>
              <div>
                <Label htmlFor="display_order" className="text-white">
                  Display Order
                </Label>
                <Input
                  id="display_order"
                  type="number"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: Number.parseInt(e.target.value) })}
                  className="border-white/20 bg-white/5 text-white"
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="bg-teal-500 hover:bg-teal-600">
                  {editingId ? "Update" : "Add"} Partner
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {partners.map((partner) => (
          <Card key={partner.id} className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardContent className="p-6">
              <div className="mb-4 flex h-24 items-center justify-center rounded-lg bg-white/5">
                <Image
                  src={partner.logo_url || "/placeholder.svg"}
                  alt={partner.name}
                  width={120}
                  height={60}
                  className="max-h-16 w-auto"
                />
              </div>
              <h3 className="mb-2 font-semibold text-white">{partner.name}</h3>
              <p className="mb-4 text-sm text-gray-400">{partner.category}</p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(partner)}
                  className="gap-2 border-white/20 text-white hover:bg-white/10"
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(partner.id)}
                  className="gap-2 border-red-500/20 text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="h-3 w-3" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
