"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trash2, AlertTriangle } from "lucide-react"

const binData = [
  {
    type: "organic",
    typeAr: "عضوي",
    color: "bg-[#1d9944]",
    borderColor: "border-[#1d9944]",
    fillLevel: 75,
    weight: 45.2,
    capacity: 60,
  },
  {
    type: "paper",
    typeAr: "ورق",
    color: "bg-blue-500",
    borderColor: "border-blue-500",
    fillLevel: 60,
    weight: 32.1,
    capacity: 50,
  },
  {
    type: "plastic",
    typeAr: "بلاستيك/معدن",
    color: "bg-yellow-500",
    borderColor: "border-yellow-500",
    fillLevel: 85,
    weight: 28.7,
    capacity: 35,
  },
  {
    type: "general",
    typeAr: "عام",
    color: "bg-gray-700",
    borderColor: "border-gray-700",
    fillLevel: 40,
    weight: 18.5,
    capacity: 45,
  },
  {
    type: "hazardous",
    typeAr: "خطر",
    color: "bg-red-500",
    borderColor: "border-red-500",
    fillLevel: 25,
    weight: 8.3,
    capacity: 30,
  },
  {
    type: "glass",
    typeAr: "زجاج",
    color: "bg-gray-100",
    borderColor: "border-gray-400",
    fillLevel: 55,
    weight: 22.9,
    capacity: 40,
  },
]

export function BinVisualizer() {
  const { t, language } = useLanguage()

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-primary" />
          {t("binStatus")}
          <Badge variant="outline" className="ml-auto text-xs">
            {language === "ar" ? "تحديث مباشر" : "Live"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {binData.map((bin) => (
            <div key={bin.type} className="space-y-3">
              <div className="relative mx-auto w-20 h-28">
                {/* Bin container */}
                <div className={`absolute inset-0 rounded-lg border-4 ${bin.borderColor} bg-gray-100 overflow-hidden`}>
                  {/* Fill level */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${bin.color}`}
                    style={{ height: `${bin.fillLevel}%` }}
                  />
                  {/* Alert indicator for high fill levels */}
                  {bin.fillLevel >= 80 && (
                    <div className="absolute top-1 right-1">
                      <AlertTriangle className="w-4 h-4 text-red-600 animate-pulse" />
                    </div>
                  )}
                </div>
                {/* Bin lid with matching color */}
                <div
                  className={`absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-4 ${bin.color} rounded-t-lg border-2 ${bin.borderColor}`}
                />
              </div>
              <div className="text-center space-y-1">
                <p className="font-medium text-sm">{language === "ar" ? bin.typeAr : t(bin.type)}</p>
                <p className="text-lg font-bold">{bin.weight} kg</p>
                <p className="text-xs text-muted-foreground">
                  / {bin.capacity} kg {language === "ar" ? "سعة" : "capacity"}
                </p>
                <Progress value={bin.fillLevel} className={`h-2 ${bin.fillLevel >= 80 ? "[&>div]:bg-red-500" : ""}`} />
                <Badge
                  variant={bin.fillLevel >= 80 ? "destructive" : bin.fillLevel >= 60 ? "secondary" : "outline"}
                  className="text-xs"
                >
                  {bin.fillLevel}%
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t flex flex-wrap gap-3 justify-center text-xs">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-[#1d9944]" />
            {language === "ar" ? "عضوي" : "Organic"}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-500" />
            {language === "ar" ? "ورق" : "Paper"}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-yellow-500" />
            {language === "ar" ? "بلاستيك" : "Plastic"}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-gray-700" />
            {language === "ar" ? "عام" : "General"}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-red-500" />
            {language === "ar" ? "خطر" : "Hazardous"}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded border-2 border-gray-400 bg-gray-100" />
            {language === "ar" ? "زجاج" : "Glass"}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
