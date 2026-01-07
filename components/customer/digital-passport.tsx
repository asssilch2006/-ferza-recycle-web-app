"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useUserStats } from "@/hooks/use-user-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { QrCode, ArrowRight, CheckCircle, Factory, Truck, Recycle, Package } from "lucide-react"

interface WasteJourney {
  id: string
  date: string
  type: string
  typeAr: string
  weight: string
  status: "collected" | "transported" | "processing" | "recycled"
  imageUrl?: string
  stages: {
    stage: string
    stageAr: string
    completed: boolean
    timestamp?: string
  }[]
}

const FALLBACK_JOURNEYS: WasteJourney[] = [
  {
    id: "FRZ-2025-001247",
    date: "2025-01-07",
    type: "Plastic",
    typeAr: "بلاستيك",
    weight: "2.5 kg",
    status: "recycled",
    stages: [
      { stage: "Collected", stageAr: "تم الجمع", completed: true, timestamp: "09:30" },
      { stage: "Transported", stageAr: "تم النقل", completed: true, timestamp: "11:45" },
      { stage: "Processing", stageAr: "قيد المعالجة", completed: true, timestamp: "14:00" },
      { stage: "Recycled", stageAr: "تم التدوير", completed: true, timestamp: "16:30" },
    ],
  },
  {
    id: "FRZ-2025-001248",
    date: "2025-01-07",
    type: "Paper",
    typeAr: "ورق",
    weight: "1.8 kg",
    status: "processing",
    stages: [
      { stage: "Collected", stageAr: "تم الجمع", completed: true, timestamp: "10:15" },
      { stage: "Transported", stageAr: "تم النقل", completed: true, timestamp: "12:30" },
      { stage: "Processing", stageAr: "قيد المعالجة", completed: false },
      { stage: "Recycled", stageAr: "تم التدوير", completed: false },
    ],
  },
]

export function DigitalPassport() {
  const { language } = useLanguage()
  const { stats } = useUserStats()
  const [selectedJourney, setSelectedJourney] = useState<WasteJourney | null>(null)

  // Safely build journeys with fallback
  const journeys: WasteJourney[] = [
    ...(stats?.lastScanImageUrl
      ? [
          {
            id: `FRZ-${new Date().getFullYear()}-${String(stats.totalScans || 1).padStart(6, "0")}`,
            date: stats.lastScanDate ? new Date(stats.lastScanDate).toISOString().split("T")[0] : "Today",
            type: stats.lastScanResult || "Unknown",
            typeAr: stats.lastScanResult || "غير معروف",
            weight: "~0.5 kg",
            status: "collected" as const,
            imageUrl: stats.lastScanImageUrl,
            stages: [
              {
                stage: "Collected",
                stageAr: "تم الجمع",
                completed: true,
                timestamp: stats.lastScanDate ? new Date(stats.lastScanDate).toLocaleTimeString() : "Now",
              },
              { stage: "Transported", stageAr: "تم النقل", completed: false },
              { stage: "Processing", stageAr: "قيد المعالجة", completed: false },
              { stage: "Recycled", stageAr: "تم التدوير", completed: false },
            ],
          },
        ]
      : []),
    ...FALLBACK_JOURNEYS,
  ]

  const getStatusIcon = (stage: string) => {
    switch (stage) {
      case "Collected":
        return Package
      case "Transported":
        return Truck
      case "Processing":
        return Factory
      case "Recycled":
        return Recycle
      default:
        return Package
    }
  }

  return (
    <Card className="border-0 shadow-lg rounded-[20px] card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <QrCode className="w-5 h-5" style={{ color: "#1d9944" }} />
          {language === "ar" ? "جواز النفايات الرقمي" : "Digital Waste Passport"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          {language === "ar"
            ? "تتبع رحلة نفاياتك من الجمع إلى المصنع بشفافية 100%"
            : "Track your waste journey from collection to factory with 100% transparency"}
        </p>

        <div className="space-y-3" suppressHydrationWarning>
          {journeys.map((journey) => (
            <Dialog key={journey.id}>
              <DialogTrigger asChild>
                <div
                  className="p-4 rounded-xl bg-secondary/50 card-hover cursor-pointer border-l-4"
                  style={{ borderColor: "#1d9944" }}
                  onClick={() => setSelectedJourney(journey)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {journey.imageUrl && (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={journey.imageUrl || "/placeholder.svg"}
                            alt={journey.type}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = "none"
                            }}
                          />
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-background px-2 py-1 rounded">{journey.id}</code>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              journey.status === "recycled"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {journey.status === "recycled"
                              ? language === "ar"
                                ? "تم التدوير"
                                : "Recycled"
                              : language === "ar"
                                ? "قيد المعالجة"
                                : "Processing"}
                          </span>
                        </div>
                        <p className="text-sm mt-1">
                          {language === "ar" ? journey.typeAr : journey.type} - {journey.weight}
                        </p>
                        <p className="text-xs text-muted-foreground">{journey.date}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md" suppressHydrationWarning>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5" style={{ color: "#1d9944" }} />
                    {language === "ar" ? "رحلة النفايات" : "Waste Journey"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-secondary rounded-xl">
                    {journey.imageUrl ? (
                      <div className="w-32 h-32 mx-auto rounded-xl overflow-hidden mb-2">
                        <img
                          src={journey.imageUrl || "/placeholder.svg"}
                          alt={journey.type}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center mb-2">
                        <QrCode className="w-24 h-24" style={{ color: "#1d9944" }} />
                      </div>
                    )}
                    <code className="text-sm font-mono">{journey.id}</code>
                  </div>

                  <div className="space-y-4">
                    {journey.stages.map((stage, idx) => {
                      const Icon = getStatusIcon(stage.stage)
                      return (
                        <div key={idx} className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              stage.completed ? "bg-green-100 dark:bg-green-900/30" : "bg-gray-100 dark:bg-gray-800"
                            }`}
                          >
                            {stage.completed ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <Icon className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className={`font-medium ${!stage.completed && "text-muted-foreground"}`}>
                              {language === "ar" ? stage.stageAr : stage.stage}
                            </p>
                            {stage.timestamp && <p className="text-xs text-muted-foreground">{stage.timestamp}</p>}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
