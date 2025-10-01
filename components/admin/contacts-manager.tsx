"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, Building2, Calendar, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  message: string
  status: "new" | "in-progress" | "resolved" | "archived"
  created_at: string
}

export function ContactsManager() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const fetchSubmissions = async () => {
    const supabase = createClient()
    let query = supabase.from("contact_submissions").select("*").order("created_at", { ascending: false })

    if (filterStatus !== "all") {
      query = query.eq("status", filterStatus)
    }

    const { data, error } = await query

    if (error) {
      console.error("[v0] Error fetching submissions:", error)
      return
    }

    setSubmissions(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchSubmissions()
  }, [filterStatus])

  const updateStatus = async (id: string, newStatus: string) => {
    const supabase = createClient()
    const { error } = await supabase.from("contact_submissions").update({ status: newStatus }).eq("id", id)

    if (error) {
      console.error("[v0] Error updating status:", error)
      return
    }

    fetchSubmissions()
  }

  const deleteSubmission = async (id: string) => {
    if (!confirm("Are you sure you want to delete this submission?")) return

    const supabase = createClient()
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id)

    if (error) {
      console.error("[v0] Error deleting submission:", error)
      return
    }

    fetchSubmissions()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "resolved":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "archived":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (loading) {
    return <div className="text-white">Loading submissions...</div>
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">Filter by status:</span>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48 bg-black/50 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Submissions</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-gray-400">
          {submissions.length} {submissions.length === 1 ? "submission" : "submissions"}
        </span>
      </div>

      {/* Submissions List */}
      <div className="space-y-4">
        {submissions.length === 0 ? (
          <Card className="border-white/10 bg-black/50 backdrop-blur-xl">
            <CardContent className="py-12 text-center text-gray-400">No submissions found.</CardContent>
          </Card>
        ) : (
          submissions.map((submission) => (
            <Card key={submission.id} className="border-white/10 bg-black/50 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-xl text-white">{submission.name}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <a href={`mailto:${submission.email}`} className="hover:text-primary">
                          {submission.email}
                        </a>
                      </div>
                      {submission.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <a href={`tel:${submission.phone}`} className="hover:text-primary">
                            {submission.phone}
                          </a>
                        </div>
                      )}
                      {submission.company && (
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>{submission.company}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDistanceToNow(new Date(submission.created_at), { addSuffix: true })}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(submission.status)}>{submission.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-gray-400 mb-2">Message:</div>
                  <p className="text-white leading-relaxed whitespace-pre-wrap">{submission.message}</p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                  <Select value={submission.status} onValueChange={(value) => updateStatus(submission.id, value)}>
                    <SelectTrigger className="w-48 bg-black/50 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteSubmission(submission.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
