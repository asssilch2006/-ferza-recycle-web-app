"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, AlertTriangle, Thermometer, Wind, Droplets, Clock } from "lucide-react"

const safetyTips = [
  {
    icon: ShieldCheck,
    title: "Personal Protective Equipment",
    description: "Always wear gloves, masks, and protective eyewear when handling waste materials.",
    priority: "high",
  },
  {
    icon: AlertTriangle,
    title: "Hazardous Waste Protocol",
    description: "Store hazardous materials separately in sealed containers with proper labeling.",
    priority: "critical",
  },
  {
    icon: Thermometer,
    title: "Temperature Control",
    description: "Keep organic waste storage areas below 10°C to prevent bacterial growth.",
    priority: "medium",
  },
  {
    icon: Wind,
    title: "Ventilation Requirements",
    description: "Ensure proper ventilation in storage areas to prevent harmful gas accumulation.",
    priority: "high",
  },
  {
    icon: Droplets,
    title: "Spill Management",
    description: "Keep spill kits readily available and train staff on proper cleanup procedures.",
    priority: "medium",
  },
  {
    icon: Clock,
    title: "Regular Disposal Schedule",
    description: "Empty bins at least twice weekly to maintain hygiene standards.",
    priority: "medium",
  },
]

export function HealthSafetyTips() {
  const { t } = useLanguage()

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "border-red-500 bg-red-50"
      case "high":
        return "border-orange-500 bg-orange-50"
      default:
        return "border-blue-500 bg-blue-50"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "critical":
        return <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">Critical</span>
      case "high":
        return <span className="px-2 py-1 text-xs font-medium bg-orange-500 text-white rounded-full">High</span>
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-blue-500 text-white rounded-full">Medium</span>
    }
  }

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          {t("healthSafety")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {safetyTips.map((tip, index) => (
            <div key={index} className={`p-4 rounded-xl border-l-4 ${getPriorityColor(tip.priority)}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <tip.icon className="w-5 h-5 text-foreground" />
                  <h4 className="font-semibold text-sm">{tip.title}</h4>
                </div>
                {getPriorityBadge(tip.priority)}
              </div>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
