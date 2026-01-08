"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Star, ExternalLink, Plus, CheckCircle2, XCircle, Globe } from "lucide-react"
import { ReviewForm } from "@/components/review-form"
import { CompanyMap } from "@/components/company-map"

interface Company {
  id: string
  name: string
  industry: string | null
  description: string | null
  website: string | null
  logo_url: string | null
}

interface Review {
  id: string
  review_type: string
  title: string
  content: string
  rating: number
  is_online: boolean | null
  location: string | null
  passed: boolean | null
  created_at: string
  profiles: {
    full_name: string | null
    department: string | null
    graduation_year: number | null
    is_alumni: boolean
  } | null
}

interface Location {
  id: string
  address: string
  city: string | null
  prefecture: string | null
  latitude: number | null
  longitude: number | null
}

interface CompanyDetailProps {
  company: Company
  reviews: Review[]
  locations: Location[]
  userId: string
}

export function CompanyDetail({ company, reviews, locations, userId }: CompanyDetailProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)

  const getReviewTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      internship: "インターン",
      interview: "面接",
      es: "ES",
      general: "一般",
    }
    return labels[type] || type
  }

  const averageRating = reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0

  return (
    <div className="space-y-6">
      {/* Company Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{company.name}</CardTitle>
                {company.industry && <Badge variant="secondary">{company.industry}</Badge>}
                {company.description && <CardDescription className="mt-3">{company.description}</CardDescription>}
              </div>
            </div>
            {company.website && (
              <Button variant="outline" size="sm" asChild>
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Website
                </a>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
              <span className="text-muted-foreground">({reviews.length}件のレビュー)</span>
            </div>
            {locations.length > 0 && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{locations.length}拠点</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="reviews" className="space-y-4">
        <TabsList>
          <TabsTrigger value="reviews">レビュー</TabsTrigger>
          <TabsTrigger value="locations">拠点マップ</TabsTrigger>
        </TabsList>

        <TabsContent value="reviews" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">レビュー一覧</h3>
            <Button onClick={() => setShowReviewForm(!showReviewForm)} className="gap-2">
              <Plus className="h-4 w-4" />
              レビュー投稿
            </Button>
          </div>

          {showReviewForm && (
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle>レビューを投稿</CardTitle>
                <CardDescription>あなたの体験を共有しましょう</CardDescription>
              </CardHeader>
              <CardContent>
                <ReviewForm companyId={company.id} onSuccess={() => setShowReviewForm(false)} />
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">まだレビューがありません</p>
                  <Button onClick={() => setShowReviewForm(true)} className="mt-4 gap-2">
                    <Plus className="h-4 w-4" />
                    最初のレビューを投稿
                  </Button>
                </CardContent>
              </Card>
            ) : (
              reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge>{getReviewTypeLabel(review.review_type)}</Badge>
                          {review.is_online !== null && (
                            <Badge variant="outline">
                              <Globe className="h-3 w-3 mr-1" />
                              {review.is_online ? "オンライン" : "対面"}
                            </Badge>
                          )}
                          {review.passed !== null && (
                            <Badge variant={review.passed ? "default" : "secondary"}>
                              {review.passed ? (
                                <>
                                  <CheckCircle2 className="h-3 w-3 mr-1" />
                                  通過
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-3 w-3 mr-1" />
                                  不通過
                                </>
                              )}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-lg">{review.title}</CardTitle>
                        {review.profiles && (
                          <CardDescription>
                            {review.profiles.department && `${review.profiles.department} • `}
                            {review.profiles.graduation_year && `${review.profiles.graduation_year}年卒 • `}
                            {review.profiles.is_alumni ? "OB/OG" : "現役生"}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{review.content}</p>
                    {review.location && (
                      <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {review.location}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="locations">
          <CompanyMap locations={locations} companyName={company.name} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
