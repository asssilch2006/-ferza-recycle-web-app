"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, TrendingUp, Leaf, Coins } from "lucide-react"

const stats = [
  { icon: Users, label: "Customers Served", value: "1,247", change: "+12%", color: "text-blue-500" },
  { icon: Coins, label: "Estimated Profit", value: "45,000 DA", change: "+8%", color: "text-green-500" },
  { icon: Leaf, label: "CO2 Saved", value: "2.3 tons", change: "+15%", color: "text-emerald-500" },
  { icon: TrendingUp, label: "Recycling Rate", value: "87%", change: "+5%", color: "text-primary" },
]

export function ImpactStats({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage()
  const displayStats = compact ? stats.slice(0, 2) : stats

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {t("impactStats")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
          {displayStats.map((stat, index) => (
            <div key={index} className="p-4 bg-secondary rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-xs text-green-500">{stat.change}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
