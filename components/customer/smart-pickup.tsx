"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, QrCode, Calendar, Clock, CheckCircle, Route, Zap, MapPin } from "lucide-react"

export function SmartPickup() {
  const { t, language } = useLanguage()
  const [isRequested, setIsRequested] = useState(false)
  const [wasteType, setWasteType] = useState("")
  const [isOptimizing, setIsOptimizing] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsOptimizing(true)

    // Simulate AI route optimization
    setTimeout(() => {
      setIsOptimizing(false)
      setIsRequested(true)
    }, 2000)
  }

  if (isRequested) {
    return (
      <Card className="border-0 shadow-lg rounded-[20px]">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">
              {language === "ar" ? "تم جدولة الجمع الذكي!" : "AI Pickup Scheduled!"}
            </h3>
            <p className="text-muted-foreground">
              {language === "ar"
                ? "تم تحسين المسار باستخدام الذكاء الاصطناعي. سيصل الجامع في أسرع وقت."
                : "Route optimized using AI. Collector will arrive via the fastest path."}
            </p>
          </div>

          {/* AI Route Info */}
          <div className="p-4 bg-primary/10 rounded-xl space-y-2">
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              <Route className="w-5 h-5" />
              <span>{language === "ar" ? "المسار المُحسَّن بالذكاء الاصطناعي" : "AI-Optimized Route"}</span>
            </div>
            <div className="flex justify-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                2.3 km
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-muted-foreground" />
                ~15 min
              </span>
              <span className="flex items-center gap-1 text-green-600">
                <Zap className="w-4 h-4" />
                -40% CO₂
              </span>
            </div>
          </div>

          <div className="p-6 bg-secondary rounded-xl inline-block">
            <QrCode className="w-32 h-32 mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">
              {language === "ar" ? "امسح للتحقق من الجمع" : "Scan to verify pickup"}
            </p>
          </div>
          <div className="flex gap-4 justify-center text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {language === "ar" ? "اليوم" : "Today"}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              2:00 PM - 2:30 PM
            </span>
          </div>
          <Button variant="outline" onClick={() => setIsRequested(false)} className="rounded-xl">
            {language === "ar" ? "طلب جمع آخر" : "Request Another Pickup"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary" />
          {t("smartPickup")}
          <span className="ml-auto flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
            <Zap className="w-3 h-3" />
            AI
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-3 bg-primary/10 rounded-xl text-sm">
            <p className="flex items-center gap-2">
              <Route className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {language === "ar"
                  ? "يقوم الذكاء الاصطناعي بتحسين المسار لتقليل وقت الانتظار والانبعاثات"
                  : "AI optimizes the route to minimize wait time and emissions"}
              </span>
            </p>
          </div>

          <div className="space-y-2">
            <Label>{language === "ar" ? "نوع النفايات" : "Waste Type"}</Label>
            <Select value={wasteType} onValueChange={setWasteType}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder={language === "ar" ? "اختر نوع النفايات" : "Select waste type"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organic">{t("organic")}</SelectItem>
                <SelectItem value="paper">{t("paper")}</SelectItem>
                <SelectItem value="plastic">{t("plastic")}</SelectItem>
                <SelectItem value="glass">{t("glass")}</SelectItem>
                <SelectItem value="hazardous">{t("hazardous")}</SelectItem>
                <SelectItem value="general">{t("general")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{language === "ar" ? "العنوان" : "Address"}</Label>
            <Input
              placeholder={language === "ar" ? "أدخل عنوان الجمع" : "Enter your pickup address"}
              className="rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label>{language === "ar" ? "الكمية التقديرية" : "Estimated Quantity"}</Label>
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder={language === "ar" ? "اختر الكمية" : "Select quantity"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">{language === "ar" ? "صغيرة (أقل من 5 كجم)" : "Small (< 5kg)"}</SelectItem>
                <SelectItem value="medium">{language === "ar" ? "متوسطة (5-15 كجم)" : "Medium (5-15kg)"}</SelectItem>
                <SelectItem value="large">{language === "ar" ? "كبيرة (أكثر من 15 كجم)" : "Large (> 15kg)"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            type="submit"
            className="w-full h-12 rounded-xl text-lg gap-2"
            style={{ backgroundColor: "#1d9944" }}
            disabled={isOptimizing}
          >
            {isOptimizing ? (
              <>
                <Route className="w-5 h-5 animate-pulse" />
                {language === "ar" ? "جاري تحسين المسار..." : "Optimizing Route..."}
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                {t("requestAiPickup")}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
