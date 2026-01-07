"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, Flame, Truck, ArrowRight, Sparkles } from "lucide-react"

interface Zone {
  name: string
  nameAr: string
  level: "high" | "medium" | "low"
  waste: string
  suggestion: string
  suggestionAr: string
}

export function WasteHeatmap() {
  const { language } = useLanguage()

  const zones: Zone[] = [
    {
      name: "Didouche Mourad",
      nameAr: "ديدوش مراد",
      level: "high",
      waste: "450 kg/day",
      suggestion: "Add 2 more bins",
      suggestionAr: "أضف صندوقين إضافيين",
    },
    {
      name: "Bab Ezzouar",
      nameAr: "باب الزوار",
      level: "high",
      waste: "380 kg/day",
      suggestion: "Increase pickup frequency",
      suggestionAr: "زيادة تكرار الجمع",
    },
    {
      name: "Hydra",
      nameAr: "حيدرة",
      level: "medium",
      waste: "220 kg/day",
      suggestion: "Current capacity OK",
      suggestionAr: "السعة الحالية مناسبة",
    },
    {
      name: "El Biar",
      nameAr: "الأبيار",
      level: "low",
      waste: "95 kg/day",
      suggestion: "Consider relocating 1 bin",
      suggestionAr: "فكر في نقل صندوق واحد",
    },
  ]

  const getLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#eab308"
      case "low":
        return "#22c55e"
      default:
        return "#6b7280"
    }
  }

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "high":
        return language === "ar" ? "مرتفع" : "High"
      case "medium":
        return language === "ar" ? "متوسط" : "Medium"
      case "low":
        return language === "ar" ? "منخفض" : "Low"
      default:
        return level
    }
  }

  return (
    <Card className="border-0 shadow-lg rounded-[20px] card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Map className="w-5 h-5" style={{ color: "#1d9944" }} />
          {language === "ar" ? "خريطة حرارية للنفايات" : "Waste Heatmap"}
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {language === "ar"
            ? "مناطق إنتاج النفايات العالية في الجزائر العاصمة"
            : "High waste production zones in Algiers"}
        </p>

        {/* Mini Heatmap Visualization */}
        <div className="relative h-48 bg-secondary rounded-xl overflow-hidden">
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-3 gap-1 p-2">
            {zones.map((zone, idx) => (
              <div
                key={idx}
                className="rounded-lg flex items-center justify-center text-white text-xs font-medium transition-all hover:scale-105 cursor-pointer"
                style={{
                  backgroundColor: getLevelColor(zone.level),
                  opacity: zone.level === "high" ? 0.9 : zone.level === "medium" ? 0.6 : 0.3,
                  gridColumn: idx === 0 ? "span 2" : "span 1",
                  gridRow: idx === 0 ? "span 2" : "span 1",
                }}
              >
                <div className="text-center p-1">
                  <Flame className="w-4 h-4 mx-auto mb-1" />
                  <span className="text-[10px] block">{language === "ar" ? zone.nameAr : zone.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          {zones.map((zone, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 card-hover">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getLevelColor(zone.level) }} />
                <div>
                  <span className="font-medium text-sm">{language === "ar" ? zone.nameAr : zone.name}</span>
                  <p className="text-xs text-muted-foreground">{zone.waste}</p>
                </div>
              </div>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: `${getLevelColor(zone.level)}20`, color: getLevelColor(zone.level) }}
              >
                {getLevelLabel(zone.level)}
              </span>
            </div>
          ))}
        </div>

        <Button className="w-full btn-ferza text-white rounded-xl">
          <Truck className="w-4 h-4 mr-2" />
          {language === "ar" ? "تحسين مسارات الشاحنات" : "Optimize Truck Routes"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  )
}
