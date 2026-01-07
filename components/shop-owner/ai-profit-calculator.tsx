"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Leaf, DollarSign, Scale } from "lucide-react"

interface WasteData {
  type: string
  typeAr: string
  weight: number
  taxRate: number
  color: string
}

const wasteData: WasteData[] = [
  { type: "Organic", typeAr: "عضوي", weight: 245.5, taxRate: 0.15, color: "bg-green-500" },
  { type: "Paper", typeAr: "ورق", weight: 189.2, taxRate: 0.18, color: "bg-blue-500" },
  { type: "Plastic/Metal", typeAr: "بلاستيك/معدن", weight: 156.8, taxRate: 0.22, color: "bg-yellow-500" },
  { type: "Glass", typeAr: "زجاج", weight: 98.4, taxRate: 0.25, color: "bg-gray-300" },
  { type: "Hazardous", typeAr: "خطر", weight: 12.3, taxRate: 0.35, color: "bg-red-500" },
]

export function AiProfitCalculator() {
  const { t, language } = useLanguage()
  const [animatedSavings, setAnimatedSavings] = useState(0)

  const totalWeight = wasteData.reduce((sum, w) => sum + w.weight, 0)
  const totalSavings = wasteData.reduce((sum, w) => sum + w.weight * w.taxRate * 1000, 0) // DZD
  const co2Saved = totalWeight * 2.5 // Approximate CO2 saved per kg

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = totalSavings / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= totalSavings) {
        setAnimatedSavings(totalSavings)
        clearInterval(timer)
      } else {
        setAnimatedSavings(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [totalSavings])

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-primary" />
          {t("aiProfitCalc")}
          <Badge variant="outline" className="ml-auto">
            AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-primary/10 rounded-xl text-center">
            <Scale className="w-8 h-8 mx-auto text-primary mb-2" />
            <p className="text-2xl font-bold">{totalWeight.toFixed(1)} kg</p>
            <p className="text-sm text-muted-foreground">{t("wasteCollected")}</p>
          </div>
          <div className="p-4 bg-green-100 rounded-xl text-center">
            <DollarSign className="w-8 h-8 mx-auto text-green-600 mb-2" />
            <p className="text-2xl font-bold text-green-600">{Math.round(animatedSavings).toLocaleString()} DZD</p>
            <p className="text-sm text-muted-foreground">{t("taxSavings")}</p>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="p-4 bg-secondary rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="font-medium">{language === "ar" ? "التأثير البيئي" : "Environmental Impact"}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-green-600">{co2Saved.toFixed(1)}</span>
            <span className="text-muted-foreground">kg CO₂ {language === "ar" ? "تم توفيره" : "saved"}</span>
          </div>
        </div>

        {/* Breakdown by Type */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">
            {language === "ar" ? "تفصيل التوفير حسب النوع" : "Savings Breakdown by Type"}
          </h4>
          {wasteData.map((waste) => {
            const savings = waste.weight * waste.taxRate * 1000
            return (
              <div key={waste.type} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded ${waste.color}`} />
                <span className="flex-1 text-sm">{language === "ar" ? waste.typeAr : waste.type}</span>
                <span className="text-sm text-muted-foreground">{waste.weight} kg</span>
                <span className="text-sm font-medium text-green-600">+{Math.round(savings).toLocaleString()} DZD</span>
              </div>
            )
          })}
        </div>

        {/* Projection */}
        <div className="p-3 bg-primary/10 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">{language === "ar" ? "التوقع الشهري" : "Monthly Projection"}</span>
          </div>
          <p className="text-lg font-bold text-primary">{(totalSavings * 4).toLocaleString()} DZD</p>
          <p className="text-xs text-muted-foreground">
            {language === "ar" ? "بناءً على معدل التجميع الحالي" : "Based on current collection rate"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
