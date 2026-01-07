"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp } from "lucide-react"

const monthlyData = [
  { month: "Jan", value: 65 },
  { month: "Feb", value: 75 },
  { month: "Mar", value: 82 },
  { month: "Apr", value: 78 },
  { month: "May", value: 90 },
  { month: "Jun", value: 95 },
]

const categoryBreakdown = [
  { name: "Organic", percentage: 35, color: "bg-green-500" },
  { name: "Paper", percentage: 25, color: "bg-blue-500" },
  { name: "Plastic/Metal", percentage: 20, color: "bg-yellow-500" },
  { name: "Glass", percentage: 12, color: "bg-white border border-gray-300" },
  { name: "General", percentage: 5, color: "bg-gray-700" },
  { name: "Hazardous", percentage: 3, color: "bg-red-500" },
]

export function WasteAnalytics() {
  const { t } = useLanguage()
  const maxValue = Math.max(...monthlyData.map((d) => d.value))

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg rounded-[20px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            {t("wasteAnalytics")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-end justify-between h-48 gap-2">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-primary rounded-t-lg transition-all duration-500 hover:bg-primary/80"
                  style={{ height: `${(data.value / maxValue) * 100}%` }}
                />
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-green-500 font-medium">+15%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg rounded-[20px]">
        <CardHeader>
          <CardTitle>Waste Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categoryBreakdown.map((category) => (
            <div key={category.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  {category.name}
                </span>
                <span className="font-medium">{category.percentage}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${category.color} transition-all duration-500`}
                  style={{ width: `${category.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
