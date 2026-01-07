"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Battery, Syringe, ShieldAlert, CheckCircle, Clock } from "lucide-react"

interface Alert {
  id: string
  type: "battery" | "medical" | "chemical"
  bin: string
  binAr: string
  time: string
  status: "active" | "resolved"
}

export function HazardousDetector() {
  const { language } = useLanguage()
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "battery",
      bin: "Bin #3 - Plastic",
      binAr: "صندوق #3 - بلاستيك",
      time: "5 min ago",
      status: "active",
    },
    {
      id: "2",
      type: "medical",
      bin: "Bin #1 - General",
      binAr: "صندوق #1 - عام",
      time: "2 hours ago",
      status: "resolved",
    },
  ])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "battery":
        return Battery
      case "medical":
        return Syringe
      default:
        return ShieldAlert
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "battery":
        return "#eab308"
      case "medical":
        return "#ef4444"
      default:
        return "#f97316"
    }
  }

  const resolveAlert = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, status: "resolved" } : a)))
  }

  const activeAlerts = alerts.filter((a) => a.status === "active")

  return (
    <Card className="border-0 shadow-lg rounded-[20px] card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          {language === "ar" ? "كاشف النفايات الخطرة" : "Hazardous Waste Detector"}
          {activeAlerts.length > 0 && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
              {activeAlerts.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {language === "ar"
            ? "تنبيهات الذكاء الاصطناعي للنفايات الخطرة في صناديقك"
            : "AI-powered alerts for hazardous waste in your bins"}
        </p>

        {alerts.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 mx-auto text-green-500 mb-2" />
            <p className="font-medium">{language === "ar" ? "لا توجد تنبيهات نشطة" : "No active alerts"}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map((alert) => {
              const Icon = getAlertIcon(alert.type)
              const color = getAlertColor(alert.type)
              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-xl ${alert.status === "active" ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" : "bg-secondary/50"}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${alert.status === "active" ? "animate-pulse" : ""}`}
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">
                          {alert.type === "battery"
                            ? language === "ar"
                              ? "بطارية مكتشفة"
                              : "Battery Detected"
                            : alert.type === "medical"
                              ? language === "ar"
                                ? "نفايات طبية"
                                : "Medical Waste"
                              : language === "ar"
                                ? "مواد كيميائية"
                                : "Chemical Material"}
                        </h4>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${alert.status === "active" ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400" : "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400"}`}
                        >
                          {alert.status === "active"
                            ? language === "ar"
                              ? "نشط"
                              : "Active"
                            : language === "ar"
                              ? "تم الحل"
                              : "Resolved"}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{language === "ar" ? alert.binAr : alert.bin}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <Clock className="w-3 h-3" />
                        {alert.time}
                      </div>
                    </div>
                    {alert.status === "active" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-xl bg-transparent"
                        onClick={() => resolveAlert(alert.id)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {language === "ar" ? "تم الحل" : "Resolve"}
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
