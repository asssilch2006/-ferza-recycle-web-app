"use client"

import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Smartphone, ShoppingBag, Coffee, Ticket, Zap } from "lucide-react"

const rewards = [
  { id: 1, icon: ShoppingBag, name: "300 DA Voucher", points: 100, category: "Shopping" },
  { id: 2, icon: Smartphone, name: "70 DA Mobile Credit", points: 200, category: "Mobile" },
  { id: 3, icon: Coffee, name: "Free Coffee", points: 50, category: "Food" },
  { id: 4, icon: Ticket, name: "Cinema Ticket", points: 300, category: "Entertainment" },
  { id: 5, icon: Zap, name: "1GB Data Bundle", points: 150, category: "Mobile" },
  { id: 6, icon: Gift, name: "Mystery Box", points: 500, category: "Special" },
]

export function RewardsStore() {
  const { t } = useLanguage()
  const { user } = useUser()
  const userPoints = user?.points || 0

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-primary" />
            {t("rewards")}
          </span>
          <Badge variant="secondary" className="text-lg px-4 py-1">
            {userPoints.toLocaleString()} {t("points")}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {rewards.map((reward) => {
            const canAfford = userPoints >= reward.points
            return (
              <div
                key={reward.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  canAfford
                    ? "border-primary/20 bg-primary/5 hover:border-primary"
                    : "border-transparent bg-secondary opacity-60"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <reward.icon className="w-6 h-6 text-primary" />
                  </div>
                  <Badge variant="outline">{reward.category}</Badge>
                </div>
                <h4 className="font-semibold mb-1">{reward.name}</h4>
                <p className="text-sm text-primary font-medium mb-3">
                  {reward.points} {t("points")}
                </p>
                <Button
                  className="w-full rounded-xl"
                  disabled={!canAfford}
                  variant={canAfford ? "default" : "secondary"}
                >
                  {t("redeemPoints")}
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
