"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface Location {
  id: string
  address: string
  city: string | null
  prefecture: string | null
  latitude: number | null
  longitude: number | null
}

interface CompanyMapProps {
  locations: Location[]
  companyName: string
}

export function CompanyMap({ locations, companyName }: CompanyMapProps) {
  if (locations.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <MapPin className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-muted-foreground">拠点情報がありません</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{companyName}の拠点</CardTitle>
          <CardDescription>{locations.length}件の拠点があります</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {locations.map((location) => (
              <div key={location.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">
                    {location.prefecture && `${location.prefecture} `}
                    {location.city}
                  </p>
                  <p className="text-sm text-muted-foreground">{location.address}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Placeholder for future map implementation */}
      <Card className="bg-muted/50">
        <CardContent className="p-8 text-center">
          <MapPin className="h-8 w-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-muted-foreground">日本地図表示機能は今後実装予定です</p>
        </CardContent>
      </Card>
    </div>
  )
}
