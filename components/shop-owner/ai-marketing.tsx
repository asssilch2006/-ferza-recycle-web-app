"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Megaphone, Users, TrendingUp, Gift, Sparkles, Copy, CheckCircle } from "lucide-react"
import { useState } from "react"

interface Promotion {
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  targetAudience: string
  targetAudienceAr: string
  expectedIncrease: string
}

export function AiMarketing() {
  const { language } = useLanguage()
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const promotions: Promotion[] = [
    {
      title: "Family Eco Weekend",
      titleAr: "عطلة نهاية أسبوع بيئية للعائلات",
      description: "Offer 2x points for families recycling together on weekends",
      descriptionAr: "قدم نقاط مضاعفة للعائلات التي تدور معًا في عطلة نهاية الأسبوع",
      targetAudience: "Families with children (45% of visitors)",
      targetAudienceAr: "العائلات مع أطفال (45% من الزوار)",
      expectedIncrease: "+35%",
    },
    {
      title: "Student Green Pass",
      titleAr: "بطاقة الطالب الخضراء",
      description: "Special rewards for university students with valid ID",
      descriptionAr: "مكافآت خاصة لطلاب الجامعات مع هوية صالحة",
      targetAudience: "Students aged 18-25 (28% of visitors)",
      targetAudienceAr: "الطلاب من 18-25 سنة (28% من الزوار)",
      expectedIncrease: "+22%",
    },
    {
      title: "Early Bird Bonus",
      titleAr: "مكافأة الطيور المبكرة",
      description: "Extra points for recycling before 10 AM",
      descriptionAr: "نقاط إضافية للتدوير قبل الساعة 10 صباحًا",
      targetAudience: "Morning commuters (18% of visitors)",
      targetAudienceAr: "المسافرون الصباحيون (18% من الزوار)",
      expectedIncrease: "+15%",
    },
  ]

  const handleCopy = (idx: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(idx)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <Card className="border-0 shadow-lg rounded-[20px] card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Megaphone className="w-5 h-5" style={{ color: "#1d9944" }} />
          {language === "ar" ? "محرك التسويق الذكي" : "AI Marketing Engine"}
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {language === "ar"
            ? "عروض بيئية مقترحة بناءً على التركيبة السكانية لعملائك"
            : "Eco-friendly promotions based on your customer demographics"}
        </p>

        <div className="space-y-4">
          {promotions.map((promo, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-secondary/50 card-hover border-l-4"
              style={{ borderColor: "#1d9944" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4" style={{ color: "#1d9944" }} />
                    <h4 className="font-semibold">{language === "ar" ? promo.titleAr : promo.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {language === "ar" ? promo.descriptionAr : promo.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    <span>{language === "ar" ? promo.targetAudienceAr : promo.targetAudience}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-lg font-bold" style={{ color: "#1d9944" }}>
                    <TrendingUp className="w-4 h-4" />
                    {promo.expectedIncrease}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {language === "ar" ? "زيادة متوقعة" : "Expected"}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 rounded-xl bg-transparent"
                onClick={() => handleCopy(idx, language === "ar" ? promo.titleAr : promo.title)}
              >
                {copiedId === idx ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" style={{ color: "#1d9944" }} />
                    {language === "ar" ? "تم النسخ!" : "Copied!"}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    {language === "ar" ? "نسخ العرض" : "Copy Promotion"}
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
