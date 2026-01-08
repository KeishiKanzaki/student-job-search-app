"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface Profile {
  id: string
  email: string
  full_name: string | null
  department: string | null
  faculty: string | null
  graduation_year: number | null
  is_alumni: boolean
  bio: string | null
  location: string | null
  points: number
  user_tags?: Array<{ tag: string }>
}

interface UserSearchProps {
  initialProfiles: Profile[]
  currentUserId: string
}

export function UserSearch({ initialProfiles, currentUserId }: UserSearchProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [showFilters, setShowFilters] = useState(false)

  const availableTags = ["現役生", "OB/OG", "本選考通過", "ES通過", "インターン参加", "面接経験"]
  const departments = ["情報工学部", "工学部", "生命体工学研究科", "その他"]

  const filteredProfiles = initialProfiles.filter((profile) => {
    const matchesSearch =
      !searchTerm ||
      profile.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.department?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.faculty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      profile.location?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.some((tag) => {
        if (tag === "現役生") return !profile.is_alumni
        if (tag === "OB/OG") return profile.is_alumni
        return profile.user_tags?.some((t) => t.tag === tag)
      })

    const matchesDepartment = departmentFilter === "all" || profile.department?.includes(departmentFilter)

    return matchesSearch && matchesTags && matchesDepartment
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="名前・学部・地域で検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="gap-2">
          <Filter className="h-4 w-4" />
          フィルター
        </Button>
      </div>

      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">フィルター設定</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>学部</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>タグ</Label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox id={tag} checked={selectedTags.includes(tag)} onCheckedChange={() => toggleTag(tag)} />
                    <Label htmlFor={tag} className="font-normal cursor-pointer">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProfiles.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="text-center py-12">
              <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-muted-foreground">ユーザーが見つかりませんでした</p>
            </CardContent>
          </Card>
        ) : (
          filteredProfiles.map((profile) => (
            <Link key={profile.id} href={`/dashboard/users/${profile.id}`}>
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {profile.full_name?.[0]?.toUpperCase() || profile.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">
                        {profile.full_name || profile.email.split("@")[0]}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-2 flex-wrap mt-1">
                        {profile.is_alumni ? (
                          <Badge variant="secondary">OB/OG</Badge>
                        ) : (
                          <Badge variant="default">現役生</Badge>
                        )}
                        {profile.graduation_year && <span className="text-xs">{profile.graduation_year}年卒</span>}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {profile.department && (
                    <p className="text-sm">
                      <span className="font-medium">学部:</span> {profile.department}
                    </p>
                  )}
                  {profile.location && (
                    <p className="text-sm">
                      <span className="font-medium">地域:</span> {profile.location}
                    </p>
                  )}
                  {profile.bio && <p className="text-sm text-muted-foreground line-clamp-2">{profile.bio}</p>}
                  {profile.user_tags && profile.user_tags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {profile.user_tags.slice(0, 3).map((tagObj, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tagObj.tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xs text-muted-foreground">貢献ポイント</span>
                    <span className="text-sm font-semibold text-primary">{profile.points}pt</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
