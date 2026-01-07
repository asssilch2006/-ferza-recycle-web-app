"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, TrendingUp, TrendingDown, DollarSign, Clock, ArrowUpRight, RefreshCw } from "lucide-react"

interface MaterialPrice {
  name: string
  nameAr: string
  price: number
  change: number
  trend: "up" | "down"
  unit: string
  color: string
  history: number[]
}

export function WasteMarketplace() {
  const { language } = useLanguage()
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const materials: MaterialPrice[] = [
    {
      name: "Plastic (PET)",
      nameAr: "بلاستيك (PET)",
      price: 85,
      change: 5.2,
      trend: "up",
      unit: "DZD/kg",
      color: "#eab308",
      history: [72, 75, 78, 80, 82, 85],
    },
    {
      name: "Aluminum",
      nameAr: "ألمنيوم",
      price: 245,
      change: -2.1,
      trend: "down",
      unit: "DZD/kg",
      color: "#6b7280",
      history: [250, 252, 248, 246, 244, 245],
    },
    {
      name: "Paper/Cardboard",
      nameAr: "ورق/كرتون",
      price: 45,
      change: 8.5,
      trend: "up",
      unit: "DZD/kg",
      color: "#a855f7",
      history: [38, 40, 41, 42, 44, 45],
    },
    {
      name: "Glass",
      nameAr: "زجاج",
      price: 35,
      change: 1.2,
      trend: "up",
      unit: "DZD/kg",
      color: "#0ea5e9",
      history: [33, 33, 34, 34, 35, 35],
    },
  ]

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  const MiniChart = ({ data, color }: { data: number[]; color: string }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    return (
      <div className="flex items-end gap-0.5 h-8">
        {data.map((value, i) => (
          <div
            key={i}
            className="w-1.5 rounded-t transition-all duration-300"
            style={{
              height: `${((value - min) / range) * 100}%`,
              minHeight: "4px",
              backgroundColor: color,
              opacity: 0.3 + (i / data.length) * 0.7,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <Card className="border-0 shadow-lg rounded-[20px] card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5" style={{ color: "#1d9944" }} />
            {language === "ar" ? "بورصة النفايات" : "Waste Marketplace"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>
            {language === "ar" ? "آخر تحديث:" : "Last updated:"}{" "}
            {lastUpdated.toLocaleTimeString(language === "ar" ? "ar-DZ" : "en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {materials.map((material, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-secondary/50 card-hover"
              style={{ borderLeft: `4px solid ${material.color}` }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold">{language === "ar" ? material.nameAr : material.name}</h4>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-bold">{material.price}</span>
                    <span className="text-sm text-muted-foreground">{material.unit}</span>
                  </div>
                </div>
                <div className="text-right">
                  <MiniChart data={material.history} color={material.color} />
                  <div
                    className={`flex items-center gap-1 text-sm font-medium mt-1 ${material.trend === "up" ? "text-green-600" : "text-red-500"}`}
                  >
                    {material.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>
                      {material.trend === "up" ? "+" : ""}
                      {material.change}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(29, 153, 68, 0.1)" }}>
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5" style={{ color: "#1d9944" }} />
            <span className="font-semibold" style={{ color: "#1d9944" }}>
              {language === "ar" ? "توصية الذكاء الاصطناعي" : "AI Recommendation"}
            </span>
          </div>
          <p className="text-sm">
            {language === "ar"
              ? "أفضل وقت لبيع البلاستيك الآن! الأسعار في ارتفاع مستمر منذ 3 أيام."
              : "Best time to sell plastic NOW! Prices have been rising for 3 days straight."}
          </p>
          <Button className="w-full mt-3 btn-ferza text-white rounded-xl" size="sm">
            <ArrowUpRight className="w-4 h-4 mr-2" />
            {language === "ar" ? "اتصل بالمصنع" : "Contact Factory"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
