"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Award, Building2, MessageSquare, Lock, Save, Plus, X, Star, TrendingUp, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { User as SupabaseUser } from "@supabase/supabase-js"

interface Profile {
  id: string
  email: string
  full_name: string | null
  student_id: string | null
  department: string | null
  faculty: string | null
  graduation_year: number | null
  is_alumni: boolean
  bio: string | null
  location: string | null
  points: number
  user_tags?: Array<{ tag: string }>
}

interface Review {
  id: string
  review_type: string
  title: string
  rating: number
  created_at: string
  companies: {
    name: string
    industry: string | null
  } | null
}

interface ProfileManagementProps {
  user: SupabaseUser
  profile: Profile | null
  reviews: Review[]
  unreadCount: number
  messagesCount: number
}

export function ProfileManagement({ user, profile, reviews, unreadCount, messagesCount }: ProfileManagementProps) {
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    student_id: profile?.student_id || "",
    department: profile?.department || "",
    faculty: profile?.faculty || "",
    graduation_year: profile?.graduation_year?.toString() || "",
    is_alumni: profile?.is_alumni || false,
    bio: profile?.bio || "",
    location: profile?.location || "",
  })
  const [tags, setTags] = useState<string[]>(profile?.user_tags?.map((t) => t.tag) || [])
  const [newTag, setNewTag] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      console.log("[v0] Profile updated:", formData, tags)
      setMessage("プロフィールを更新しました")
    } catch (error: any) {
      setMessage(`エラー: ${error.message}`)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangingPassword(true)
    setMessage("")

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage("パスワードが一致しません")
      setIsChangingPassword(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage("パスワードは6文字以上で入力してください")
      setIsChangingPassword(false)
      return
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 800))

      console.log("[v0] Password changed")
      setMessage("パスワードを変更しました")
      setPasswordData({ newPassword: "", confirmPassword: "" })
    } catch (error: any) {
      setMessage(`エラー: ${error.message}`)
    } finally {
      setIsChangingPassword(false)
    }
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i)

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {profile?.full_name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">
                {profile?.full_name || user.email.split("@")[0]}さんのマイページ
              </CardTitle>
              <CardDescription className="flex items-center gap-2">
                {profile?.is_alumni ? (
                  <Badge variant="secondary">OB/OG</Badge>
                ) : (
                  <Badge variant="default">現役生</Badge>
                )}
                <span>{user.email}</span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{profile?.points || 0}</p>
                <p className="text-xs text-muted-foreground">ポイント</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Building2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{reviews.length}</p>
                <p className="text-xs text-muted-foreground">投稿レビュー</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <MessageSquare className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{messagesCount}</p>
                <p className="text-xs text-muted-foreground">メッセージ</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <TrendingUp className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{unreadCount}</p>
                <p className="text-xs text-muted-foreground">未読</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            プロフィール
          </TabsTrigger>
          <TabsTrigger value="password" className="gap-2">
            <Lock className="h-4 w-4" />
            パスワード
          </TabsTrigger>
          <TabsTrigger value="activity" className="gap-2">
            <Star className="h-4 w-4" />
            活動履歴
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>プロフィール編集</CardTitle>
              <CardDescription>あなたの情報を更新してください</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                {message && (
                  <div
                    className={`p-3 rounded-lg text-sm ${message.includes("エラー") ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
                  >
                    {message}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full_name">氏名</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      placeholder="山田 太郎"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="student_id">学籍番号</Label>
                    <Input
                      id="student_id"
                      value={formData.student_id}
                      onChange={(e) => setFormData({ ...formData, student_id: e.target.value })}
                      placeholder="例: 12345678"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty">学部</Label>
                    <Select
                      value={formData.faculty}
                      onValueChange={(value) => setFormData({ ...formData, faculty: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="情報工学部">情報工学部</SelectItem>
                        <SelectItem value="工学部">工学部</SelectItem>
                        <SelectItem value="生命体工学研究科">生命体工学研究科</SelectItem>
                        <SelectItem value="その他">その他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">学科・専攻</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      placeholder="例: 知能情報工学科"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="graduation_year">卒業年度</Label>
                    <Select
                      value={formData.graduation_year}
                      onValueChange={(value) => setFormData({ ...formData, graduation_year: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="選択してください" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}年
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">居住地</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="例: 福岡県北九州市"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_alumni"
                    checked={formData.is_alumni}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_alumni: checked })}
                  />
                  <Label htmlFor="is_alumni" className="font-normal">
                    OB/OGとして登録する
                  </Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">自己紹介</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="就活状況や興味のある業界などを記載してください"
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>タグ</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="タグを追加"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button type="button" onClick={addTag} variant="outline" className="gap-2 bg-transparent">
                      <Plus className="h-4 w-4" />
                      追加
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="ml-1">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">例: 本選考通過、ES通過、インターン参加、面接経験など</p>
                </div>

                <Button type="submit" disabled={isSaving} className="w-full gap-2">
                  <Save className="h-4 w-4" />
                  {isSaving ? "保存中..." : "プロフィールを保存"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>パスワード変更</CardTitle>
              <CardDescription>新しいパスワードを設定してください</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                {message && (
                  <div
                    className={`p-3 rounded-lg text-sm ${message.includes("エラー") ? "bg-destructive/10 text-destructive" : "bg-primary/10 text-primary"}`}
                  >
                    {message}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="new_password">新しいパスワード</Label>
                  <Input
                    id="new_password"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    placeholder="6文字以上"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm_password">パスワード（確認）</Label>
                  <Input
                    id="confirm_password"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    placeholder="もう一度入力"
                    required
                  />
                </div>

                <Button type="submit" disabled={isChangingPassword} className="w-full">
                  {isChangingPassword ? "変更中..." : "パスワードを変更"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>活動履歴</CardTitle>
              <CardDescription>あなたの投稿レビュー一覧</CardDescription>
            </CardHeader>
            <CardContent>
              {reviews.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>まだレビューを投稿していません</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="secondary">{review.review_type}</Badge>
                            {review.companies && <span className="text-sm font-medium">{review.companies.name}</span>}
                          </div>
                          <p className="text-sm font-medium">{review.title}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {new Date(review.created_at).toLocaleDateString("ja-JP")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
