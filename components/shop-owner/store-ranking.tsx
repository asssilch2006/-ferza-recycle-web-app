"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, TrendingUp, MapPin, Globe } from "lucide-react"

export function StoreRanking({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage()

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          {t("storeRanking")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl">
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Local Ranking</p>
                <p className="text-2xl font-bold">#3</p>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2
            </Badge>
          </div>

          {!compact && (
            <>
              <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">National Ranking</p>
                    <p className="text-2xl font-bold">#127</p>
                  </div>
                </div>
                <Badge variant="secondary">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +15
                </Badge>
              </div>

              <div className="p-4 bg-secondary rounded-xl">
                <p className="text-sm text-muted-foreground mb-2">Performance Score</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">87</span>
                  <span className="text-muted-foreground">/100</span>
                </div>
                <p className="text-xs text-green-500 mt-1">Excellent rating!</p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
