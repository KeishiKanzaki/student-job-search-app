"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Award, Building2, MessageSquare, Star } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

interface UserProfileProps {
  profile: Profile
  reviews: Review[]
  currentUserId: string
}

export function UserProfile({ profile, reviews, currentUserId }: UserProfileProps) {
  const router = useRouter()

  const handleStartConversation = () => {
    router.push(`/dashboard/messages?user=${profile.id}`)
  }

  const getReviewTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      internship: "インターン",
      interview: "面接",
      es: "ES",
      general: "一般",
    }
    return labels[type] || type
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                  {profile.full_name?.[0]?.toUpperCase() || profile.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{profile.full_name || profile.email.split("@")[0]}</CardTitle>
                <div className="flex items-center gap-2 flex-wrap mb-3">
                  {profile.is_alumni ? (
                    <Badge variant="secondary" className="text-sm">
                      OB/OG
                    </Badge>
                  ) : (
                    <Badge variant="default" className="text-sm">
                      現役生
                    </Badge>
                  )}
                  {profile.graduation_year && <Badge variant="outline">{profile.graduation_year}年卒</Badge>}
                </div>
                {profile.bio && <CardDescription className="mt-2 text-base">{profile.bio}</CardDescription>}
              </div>
            </div>
            <Button onClick={handleStartConversation} className="gap-2">
              <MessageSquare className="h-4 w-4" />
              相談を申し込む
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {profile.department && (
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground text-xs">学部・学科</p>
                  <p className="font-medium">{profile.department}</p>
                </div>
              </div>
            )}
            {profile.location && (
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground text-xs">地域</p>
                  <p className="font-medium">{profile.location}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground text-xs">貢献ポイント</p>
                <p className="font-medium text-primary">{profile.points}pt</p>
              </div>
            </div>
          </div>

          {profile.user_tags && profile.user_tags.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-sm font-medium mb-3">タグ</p>
              <div className="flex flex-wrap gap-2">
                {profile.user_tags.map((tagObj, idx) => (
                  <Badge key={idx} variant="outline">
                    {tagObj.tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card>
        <CardHeader>
          <CardTitle>投稿したレビュー</CardTitle>
          <CardDescription>{reviews.length}件のレビュー</CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
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
                        <Badge variant="secondary">{getReviewTypeLabel(review.review_type)}</Badge>
                        {review.companies && (
                          <Link
                            href={`/dashboard/companies/${review.companies}`}
                            className="text-sm font-medium hover:underline"
                          >
                            {review.companies.name}
                          </Link>
                        )}
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
                  <p className="text-xs text-muted-foreground">
                    {new Date(review.created_at).toLocaleDateString("ja-JP")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
