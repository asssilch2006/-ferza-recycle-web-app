"use client"

import { useLanguage } from "@/contexts/language-context"
import { useUserStats } from "@/hooks/use-user-stats"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Coins, TrendingUp, Gift, Loader2 } from "lucide-react"

const FALLBACK_POINTS = 156
const FALLBACK_STATS = {
  co2Reduced: 48.5,
  totalScans: 24,
}

export function PointsWallet() {
  const { t, language } = useLanguage()
  const { points, stats, isLoading } = useUserStats()

  const safePoints = points ?? FALLBACK_POINTS
  const safeStats = stats ?? FALLBACK_STATS
  const nextReward = 1500
  const progress = (safePoints / nextReward) * 100

  return (
    <Card className="border-0 shadow-lg rounded-[20px] overflow-hidden card-hover">
      <div
        className="p-6 text-white"
        style={{ background: "linear-gradient(135deg, #1d9944 0%, #25b854 100%)" }}
        suppressHydrationWarning
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">{t("totalPoints")}</p>
            <div className="flex items-center gap-2">
              <p className="text-4xl font-bold" suppressHydrationWarning>
                {safePoints.toLocaleString()}
              </p>
              {isLoading && <Loader2 className="w-5 h-5 animate-spin opacity-70" />}
            </div>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <Coins className="w-8 h-8" />
          </div>
        </div>
      </div>
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {language === "ar" ? "نقاط للمكافأة التالية" : "Points to next reward"}
            </span>
            <span className="font-medium" suppressHydrationWarning>
              {Math.max(0, nextReward - safePoints)} pts
            </span>
          </div>
          <Progress value={Math.min(progress, 100)} className="h-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl card-hover cursor-pointer">
            <TrendingUp className="w-5 h-5 text-primary nav-icon-hover" />
            <div>
              <p className="text-xs text-muted-foreground">{language === "ar" ? "هذا الشهر" : "This Month"}</p>
              <p className="font-semibold" suppressHydrationWarning>
                +{Math.round((safeStats.co2Reduced || 48.5) * 3)} pts
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-secondary rounded-xl card-hover cursor-pointer">
            <Gift className="w-5 h-5 text-primary nav-icon-hover" />
            <div>
              <p className="text-xs text-muted-foreground">{language === "ar" ? "عمليات المسح" : "Total Scans"}</p>
              <p className="font-semibold" suppressHydrationWarning>
                {safeStats.totalScans || 24}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
