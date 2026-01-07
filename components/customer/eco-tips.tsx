"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, Shield, Recycle, Heart, Lightbulb, Droplet } from "lucide-react"

const tips = [
  {
    icon: Shield,
    title: "Wear Protective Gloves",
    description: "Always use gloves when handling waste to protect yourself from harmful substances.",
    color: "text-blue-500",
  },
  {
    icon: Recycle,
    title: "Sort Before Disposal",
    description: "Separate recyclables from general waste to maximize recycling efficiency.",
    color: "text-green-500",
  },
  {
    icon: Heart,
    title: "Reduce Single-Use Plastics",
    description: "Opt for reusable bags, bottles, and containers to minimize plastic waste.",
    color: "text-red-500",
  },
  {
    icon: Lightbulb,
    title: "Compost Organic Waste",
    description: "Turn food scraps and yard waste into nutrient-rich compost for your garden.",
    color: "text-yellow-500",
  },
  {
    icon: Droplet,
    title: "Rinse Containers",
    description: "Clean food containers before recycling to prevent contamination.",
    color: "text-cyan-500",
  },
  {
    icon: Leaf,
    title: "Go Paperless",
    description: "Opt for digital bills and documents to reduce paper consumption.",
    color: "text-emerald-500",
  },
]

export function EcoTips({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage()
  const displayTips = compact ? tips.slice(0, 2) : tips

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-primary" />
          {t("ecoTips")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2 lg:grid-cols-3"}`}>
          {displayTips.map((tip, index) => (
            <div key={index} className="p-4 bg-secondary rounded-xl space-y-2 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-background flex items-center justify-center ${tip.color}`}>
                  <tip.icon className="w-5 h-5" />
                </div>
                <h4 className="font-semibold">{tip.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
