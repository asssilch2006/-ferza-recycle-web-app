"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Bell, Clock, MapPin, Sparkles, Zap } from "lucide-react"

interface Alert {
  id: string
  binName: string
  binNameAr: string
  time: string
  location: string
  locationAr: string
  bonus: string
  bonusAr: string
}

export function SmartAlerts() {
  const { language } = useLanguage()
  const [alertsEnabled, setAlertsEnabled] = useState(true)

  const upcomingAlerts: Alert[] = [
    {
      id: "1",
      binName: "Didouche Mourad Smart Bin",
      binNameAr: "صندوق ديدوش مراد الذكي",
      time: "14:30 - 15:00",
      location: "Rue Didouche Mourad",
      locationAr: "شارع ديدوش مراد",
      bonus: "2x Points",
      bonusAr: "نقاط مضاعفة",
    },
    {
      id: "2",
      binName: "Hydra Eco Station",
      binNameAr: "محطة حيدرة البيئية",
      time: "16:00 - 16:30",
      location: "Place Hydra",
      locationAr: "ساحة حيدرة",
      bonus: "3x Points",
      bonusAr: "3 أضعاف النقاط",
    },
    {
      id: "3",
      binName: "El Biar Green Point",
      binNameAr: "نقطة الأبيار الخضراء",
      time: "Tomorrow 09:00",
      location: "Avenue El Biar",
      locationAr: "شارع الأبيار",
      bonus: "2x Points + Gift",
      bonusAr: "نقاط مضاعفة + هدية",
    },
  ]

  return (
    <Card className="border-0 shadow-lg rounded-[20px] card-hover">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" style={{ color: "#1d9944" }} />
            {language === "ar" ? "تنبيهات الحضور الذكية" : "Smart Attendance Alerts"}
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </CardTitle>
          <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {language === "ar"
            ? "الذكاء الاصطناعي يقترح أفضل الأوقات للحصول على نقاط مضاعفة"
            : "AI suggests the best times to visit for bonus points"}
        </p>

        <div className="space-y-3">
          {upcomingAlerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-xl bg-secondary/50 card-hover border-l-4"
              style={{ borderColor: "#1d9944" }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold">{language === "ar" ? alert.binNameAr : alert.binName}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{language === "ar" ? alert.locationAr : alert.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Clock className="w-3 h-3" />
                    <span>{alert.time}</span>
                  </div>
                </div>
                <div
                  className="px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1"
                  style={{ backgroundColor: "rgba(29, 153, 68, 0.1)", color: "#1d9944" }}
                >
                  <Zap className="w-3 h-3" />
                  {language === "ar" ? alert.bonusAr : alert.bonus}
                </div>
              </div>
              <Button className="w-full mt-3 btn-ferza text-white rounded-xl" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                {language === "ar" ? "تعيين تذكير" : "Set Reminder"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
