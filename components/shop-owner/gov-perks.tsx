"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, FileCheck, Percent, Award, CheckCircle } from "lucide-react"

const perks = [
  {
    icon: Percent,
    title: "15% Tax Reduction",
    description: "Annual tax exemption for certified recycling partners",
    status: "active",
    value: "15% off",
  },
  {
    icon: FileCheck,
    title: "Fast-Track Permits",
    description: "Priority processing for business expansion permits",
    status: "eligible",
    value: "2x faster",
  },
  {
    icon: Award,
    title: "Green Business Certificate",
    description: "Official government certification for eco-friendly operations",
    status: "pending",
    value: "In review",
  },
  {
    icon: Building,
    title: "Subsidized Equipment",
    description: "Up to 30% subsidy on recycling equipment purchases",
    status: "available",
    value: "30% off",
  },
]

export function GovPerks() {
  const { t } = useLanguage()

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>
      case "eligible":
        return <Badge className="bg-blue-500 text-white">Eligible</Badge>
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      case "available":
        return <Badge variant="outline">Available</Badge>
      default:
        return null
    }
  }

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5 text-primary" />
          {t("govPerks")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {perks.map((perk, index) => (
          <div key={index} className="p-4 bg-secondary rounded-xl">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <perk.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{perk.title}</h4>
                  <p className="text-sm text-muted-foreground">{perk.description}</p>
                </div>
              </div>
              {getStatusBadge(perk.status)}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-primary">{perk.value}</span>
              {perk.status === "active" ? (
                <span className="flex items-center gap-1 text-sm text-green-500">
                  <CheckCircle className="w-4 h-4" />
                  Applied
                </span>
              ) : (
                <Button size="sm" variant="outline" className="rounded-lg bg-transparent">
                  {perk.status === "eligible" ? "Apply Now" : "Learn More"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
