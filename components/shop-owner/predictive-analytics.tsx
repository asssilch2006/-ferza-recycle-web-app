"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react"

interface PredictionData {
  binType: string
  binTypeAr: string
  color: string
  currentLevel: number
  predicted6h: number
  predicted12h: number
  predicted24h: number
  alertLevel: "low" | "medium" | "high"
}

const predictions: PredictionData[] = [
  {
    binType: "Organic",
    binTypeAr: "عضوي",
    color: "bg-green-500",
    currentLevel: 45,
    predicted6h: 58,
    predicted12h: 72,
    predicted24h: 89,
    alertLevel: "medium",
  },
  {
    binType: "Paper",
    binTypeAr: "ورق",
    color: "bg-blue-500",
    currentLevel: 32,
    predicted6h: 41,
    predicted12h: 52,
    predicted24h: 65,
    alertLevel: "low",
  },
  {
    binType: "Plastic",
    binTypeAr: "بلاستيك",
    color: "bg-yellow-500",
    currentLevel: 78,
    predicted6h: 85,
    predicted12h: 93,
    predicted24h: 100,
    alertLevel: "high",
  },
  {
    binType: "Glass",
    binTypeAr: "زجاج",
    color: "bg-white border-2 border-gray-300",
    currentLevel: 28,
    predicted6h: 35,
    predicted12h: 42,
    predicted24h: 51,
    alertLevel: "low",
  },
  {
    binType: "Hazardous",
    binTypeAr: "خطر",
    color: "bg-red-500",
    currentLevel: 15,
    predicted6h: 18,
    predicted12h: 22,
    predicted24h: 28,
    alertLevel: "low",
  },
  {
    binType: "General",
    binTypeAr: "عام",
    color: "bg-gray-700",
    currentLevel: 62,
    predicted6h: 74,
    predicted12h: 85,
    predicted24h: 95,
    alertLevel: "high",
  },
]

const alertColors = {
  low: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-red-100 text-red-800",
}

const alertLabels = {
  low: { en: "OK", ar: "جيد" },
  medium: { en: "Monitor", ar: "مراقبة" },
  high: { en: "Urgent", ar: "عاجل" },
}

export function PredictiveAnalytics() {
  const { t, language } = useLanguage()

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          {t("predictiveAnalytics")}
          <Badge variant="outline" className="ml-auto">
            AI
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          {language === "ar"
            ? "توقعات مستوى امتلاء الصناديق للـ 24 ساعة القادمة بناءً على البيانات التاريخية"
            : "Bin fill level predictions for the next 24 hours based on historical data"}
        </p>

        {/* Prediction Chart */}
        <div className="space-y-4">
          {predictions.map((pred) => (
            <div key={pred.binType} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${pred.color}`} />
                  <span className="font-medium text-sm">{language === "ar" ? pred.binTypeAr : pred.binType}</span>
                </div>
                <Badge className={alertColors[pred.alertLevel]}>
                  {pred.alertLevel === "high" && <AlertTriangle className="w-3 h-3 mr-1" />}
                  {pred.alertLevel === "low" && <CheckCircle className="w-3 h-3 mr-1" />}
                  {alertLabels[pred.alertLevel][language || "en"]}
                </Badge>
              </div>

              {/* Progress bars showing predictions */}
              <div className="relative h-8 bg-secondary rounded-lg overflow-hidden">
                {/* Current level */}
                <div
                  className={`absolute left-0 top-0 h-full ${pred.color.includes("white") ? "bg-gray-300" : pred.color} opacity-40`}
                  style={{ width: `${pred.currentLevel}%` }}
                />

                {/* Prediction markers */}
                <div
                  className="absolute top-0 h-full w-0.5 bg-yellow-600"
                  style={{ left: `${pred.predicted6h}%` }}
                  title={`6h: ${pred.predicted6h}%`}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-orange-600"
                  style={{ left: `${pred.predicted12h}%` }}
                  title={`12h: ${pred.predicted12h}%`}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-red-600"
                  style={{ left: `${Math.min(pred.predicted24h, 100)}%` }}
                  title={`24h: ${pred.predicted24h}%`}
                />

                {/* Labels */}
                <div className="absolute inset-0 flex items-center justify-between px-2 text-xs">
                  <span className="bg-background/80 px-1 rounded">{pred.currentLevel}%</span>
                  <span className="bg-background/80 px-1 rounded">→ {pred.predicted24h}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-2 border-t">
          <span className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-yellow-600" />
            {language === "ar" ? "6 ساعات" : "6h"}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-orange-600" />
            {language === "ar" ? "12 ساعة" : "12h"}
          </span>
          <span className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-red-600" />
            {language === "ar" ? "24 ساعة" : "24h"}
          </span>
        </div>

        {/* Recommendations */}
        <div className="p-3 bg-primary/10 rounded-xl">
          <p className="text-sm font-medium flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            {language === "ar" ? "توصية الذكاء الاصطناعي" : "AI Recommendation"}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {language === "ar"
              ? "جدولة جمع البلاستيك والنفايات العامة خلال الـ 12 ساعة القادمة"
              : "Schedule plastic and general waste collection within the next 12 hours"}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
