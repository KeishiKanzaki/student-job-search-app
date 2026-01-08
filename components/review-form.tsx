"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Star } from "lucide-react"
import { useRouter } from "next/navigation"

interface ReviewFormProps {
  companyId: string
  onSuccess: () => void
}

export function ReviewForm({ companyId, onSuccess }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    review_type: "internship",
    title: "",
    content: "",
    rating: 5,
    is_online: null as boolean | null,
    location: "",
    passed: null as boolean | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In real app, this would POST to backend API
      console.log("[v0] Review submitted:", { companyId, ...formData })

      onSuccess()
      router.refresh()
    } catch (error) {
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="review_type">レビュータイプ</Label>
        <Select
          value={formData.review_type}
          onValueChange={(value) => setFormData({ ...formData, review_type: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="internship">インターン</SelectItem>
            <SelectItem value="interview">面接</SelectItem>
            <SelectItem value="es">ES</SelectItem>
            <SelectItem value="general">一般</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="例: 2024年夏季インターン体験談"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">内容</Label>
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="詳細な体験談を記載してください"
          rows={6}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>評価</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              type="button"
              onClick={() => setFormData({ ...formData, rating })}
              className="focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${rating <= formData.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>形式</Label>
        <RadioGroup
          value={formData.is_online === null ? "none" : formData.is_online ? "online" : "offline"}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              is_online: value === "none" ? null : value === "online",
            })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="online" />
            <Label htmlFor="online" className="font-normal">
              オンライン
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="offline" id="offline" />
            <Label htmlFor="offline" className="font-normal">
              対面
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none" className="font-normal">
              未選択
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">開催地</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="例: 東京都渋谷区"
        />
      </div>

      <div className="space-y-2">
        <Label>選考結果</Label>
        <RadioGroup
          value={formData.passed === null ? "none" : formData.passed ? "passed" : "failed"}
          onValueChange={(value) =>
            setFormData({
              ...formData,
              passed: value === "none" ? null : value === "passed",
            })
          }
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="passed" id="passed" />
            <Label htmlFor="passed" className="font-normal">
              通過
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="failed" id="failed" />
            <Label htmlFor="failed" className="font-normal">
              不通過
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none-result" />
            <Label htmlFor="none-result" className="font-normal">
              未選択
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "投稿中..." : "レビューを投稿"}
      </Button>
    </form>
  )
}
