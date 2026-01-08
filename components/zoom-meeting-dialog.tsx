"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, Copy, ExternalLink } from "lucide-react"

interface ZoomMeetingDialogProps {
  isOpen: boolean
  onClose: () => void
  receiverId: string
  receiverName: string
}

export function ZoomMeetingDialog({ isOpen, onClose, receiverId, receiverName }: ZoomMeetingDialogProps) {
  const [meetingDate, setMeetingDate] = useState("")
  const [meetingTime, setMeetingTime] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [meetingUrl, setMeetingUrl] = useState("")
  const [error, setError] = useState("")

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsCreating(true)

    try {
      const scheduledDateTime = new Date(`${meetingDate}T${meetingTime}`)

      const response = await fetch("/api/zoom/create-meeting", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiverId,
          scheduledAt: scheduledDateTime.toISOString(),
        }),
      })

      if (!response.ok) {
        throw new Error("ミーティングの作成に失敗しました")
      }

      const data = await response.json()
      setMeetingUrl(data.meeting.url)
    } catch (err: any) {
      setError(err.message || "ミーティングの作成に失敗しました")
    } finally {
      setIsCreating(false)
    }
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(meetingUrl)
  }

  const handleOpenZoom = () => {
    window.open(meetingUrl, "_blank")
  }

  const handleReset = () => {
    setMeetingUrl("")
    setMeetingDate("")
    setMeetingTime("")
    setError("")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Zoomミーティングを作成</DialogTitle>
          <DialogDescription>{receiverName}さんとのミーティングを設定します</DialogDescription>
        </DialogHeader>

        {!meetingUrl ? (
          <form onSubmit={handleCreateMeeting} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="meeting-date">ミーティング日</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="meeting-date"
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meeting-time">ミーティング時刻</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="meeting-time"
                  type="time"
                  value={meetingTime}
                  onChange={(e) => setMeetingTime(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Alert>
              <AlertDescription className="text-sm">
                注意: この機能はデモ版です。実際のZoom APIと連携する場合は、Zoom開発者アカウントとAPIキーが必要です。
              </AlertDescription>
            </Alert>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                キャンセル
              </Button>
              <Button type="submit" disabled={isCreating}>
                {isCreating ? "作成中..." : "ミーティングを作成"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <Alert>
              <AlertDescription className="space-y-3">
                <p className="font-medium">ミーティングが作成されました</p>
                <div className="bg-muted p-3 rounded text-sm break-all">{meetingUrl}</div>
              </AlertDescription>
            </Alert>

            <div className="flex gap-2">
              <Button onClick={handleCopyUrl} variant="outline" className="flex-1 gap-2 bg-transparent">
                <Copy className="h-4 w-4" />
                URLをコピー
              </Button>
              <Button onClick={handleOpenZoom} className="flex-1 gap-2">
                <ExternalLink className="h-4 w-4" />
                Zoomを開く
              </Button>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={handleReset}>
                新しいミーティング
              </Button>
              <Button onClick={onClose}>閉じる</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
