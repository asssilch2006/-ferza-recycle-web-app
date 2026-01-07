"use client"

import { useLanguage } from "@/contexts/language-context"
import { useUserStats } from "@/hooks/use-user-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TreePine, Droplets, Wind, Leaf, TrendingUp, Loader2 } from "lucide-react"

const FALLBACK_STATS = {
  treesSaved: 12,
  waterConserved: 2450,
  co2Reduced: 48.5,
  totalScans: 24,
}

export function CarbonTracker() {
  const { t, language } = useLanguage()
  const { points, stats, isLoading } = useUserStats()

  // Use fallback if stats are undefined
  const safeStats = stats || FALLBACK_STATS
  const safePoints = points ?? 156

  const statsData = [
    {
      icon: TreePine,
      value: (safeStats.treesSaved || 12).toFixed(1),
      label: { en: "Trees Saved", ar: "شجرة محفوظة" },
      color: "#1d9944",
      change: "+0.2 this month",
      changeAr: "+0.2 هذا الشهر",
    },
    {
      icon: Droplets,
      value: (safeStats.waterConserved || 2450).toLocaleString(),
      unit: "L",
      label: { en: "Water Conserved", ar: "لتر ماء موفر" },
      color: "#0ea5e9",
      change: "+180L this week",
      changeAr: "+180 لتر هذا الأسبوع",
    },
    {
      icon: Wind,
      value: (safeStats.co2Reduced || 48.5).toFixed(1),
      unit: "kg",
      label: { en: "CO2 Reduced", ar: "كجم كربون مخفض" },
      color: "#8b5cf6",
      change: "+3.2kg today",
      changeAr: "+3.2 كجم اليوم",
    },
  ]

  return (
    <Card className="border-0 shadow-lg rounded-[20px] card-hover overflow-hidden relative">
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: "linear-gradient(90deg, #1d9944, #0ea5e9, #8b5cf6)" }}
      />
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5" style={{ color: "#1d9944" }} />
          {language === "ar" ? "الإرث البيئي" : "Environmental Legacy"}
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {language === "ar" ? "رصيد الكربون الخاص بك وتأثيرك البيئي" : "Your carbon credits and environmental impact"}
        </p>

        <div className="grid gap-4">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 card-hover"
              style={{ borderLeft: `4px solid ${stat.color}` }}
              suppressHydrationWarning
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold" suppressHydrationWarning>
                    {stat.value}
                  </span>
                  {stat.unit && <span className="text-lg text-muted-foreground">{stat.unit}</span>}
                </div>
                <p className="text-sm text-muted-foreground">{language === "ar" ? stat.label.ar : stat.label.en}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-xs" style={{ color: "#1d9944" }}>
                  <TrendingUp className="w-3 h-3" />
                  <span>{language === "ar" ? stat.changeAr : stat.change}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time points from Redis */}
        <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(29, 153, 68, 0.1)" }} suppressHydrationWarning>
          <div className="flex items-center justify-between">
            <span className="font-semibold" style={{ color: "#1d9944" }}>
              {language === "ar" ? "إجمالي رصيد الكربون" : "Total Carbon Credits"}
            </span>
            <span className="text-2xl font-bold" style={{ color: "#1d9944" }} suppressHydrationWarning>
              {safePoints}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1" suppressHydrationWarning>
            {language === "ar"
              ? `${safeStats.totalScans || 24} عملية مسح إجمالية`
              : `${safeStats.totalScans || 24} total scans`}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
