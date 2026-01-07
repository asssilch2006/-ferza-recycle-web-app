"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, Leaf } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  name: string
  nameAr: string
  points: number
  co2Saved: number // Added CO2 saved field
  isCurrentUser?: boolean
}

const mockData: Record<string, LeaderboardEntry[]> = {
  municipality: [
    { rank: 1, name: "Ahmed B.", nameAr: "أحمد ب.", points: 4520, co2Saved: 156.2 },
    { rank: 2, name: "Fatima Z.", nameAr: "فاطمة ز.", points: 4210, co2Saved: 142.8 },
    { rank: 3, name: "Mohamed K.", nameAr: "محمد ك.", points: 3890, co2Saved: 128.5 },
    { rank: 4, name: "You", nameAr: "أنت", points: 1250, co2Saved: 43.2, isCurrentUser: true },
    { rank: 5, name: "Sara M.", nameAr: "سارة م.", points: 1100, co2Saved: 38.1 },
  ],
  state: [
    { rank: 1, name: "Youssef A.", nameAr: "يوسف أ.", points: 8750, co2Saved: 298.4 },
    { rank: 2, name: "Amina L.", nameAr: "أمينة ل.", points: 7920, co2Saved: 265.2 },
    { rank: 3, name: "Karim D.", nameAr: "كريم د.", points: 7100, co2Saved: 241.8 },
    { rank: 12, name: "You", nameAr: "أنت", points: 1250, co2Saved: 43.2, isCurrentUser: true },
  ],
  national: [
    { rank: 1, name: "Rachid H.", nameAr: "رشيد ح.", points: 15200, co2Saved: 512.6 },
    { rank: 2, name: "Nadia S.", nameAr: "نادية س.", points: 14800, co2Saved: 498.3 },
    { rank: 3, name: "Omar T.", nameAr: "عمر ت.", points: 13500, co2Saved: 456.1 },
    { rank: 156, name: "You", nameAr: "أنت", points: 1250, co2Saved: 43.2, isCurrentUser: true },
  ],
}

const getRankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />
  if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />
  return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>
}

export function Leaderboard() {
  const { t, language } = useLanguage()
  const [level, setLevel] = useState("municipality")

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          {t("co2Ranking")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={level} onValueChange={setLevel}>
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="municipality">{t("municipality_level")}</TabsTrigger>
            <TabsTrigger value="state">{t("state_level")}</TabsTrigger>
            <TabsTrigger value="national">{t("national_level")}</TabsTrigger>
          </TabsList>

          {Object.entries(mockData).map(([key, entries]) => (
            <TabsContent key={key} value={key} className="space-y-2">
              {entries.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    entry.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary"
                  }`}
                >
                  <div className="flex items-center justify-center w-8">{getRankIcon(entry.rank)}</div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className={entry.isCurrentUser ? "bg-primary-foreground text-primary" : ""}>
                      {entry.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{language === "ar" ? entry.nameAr : entry.name}</p>
                    <div className="flex items-center gap-3 text-sm">
                      <span className={entry.isCurrentUser ? "opacity-90" : "text-muted-foreground"}>
                        {entry.points.toLocaleString()} {t("points")}
                      </span>
                      <span
                        className={`flex items-center gap-1 ${entry.isCurrentUser ? "opacity-90" : "text-green-600"}`}
                      >
                        <Leaf className="w-3 h-3" />
                        {entry.co2Saved} kg CO₂
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
