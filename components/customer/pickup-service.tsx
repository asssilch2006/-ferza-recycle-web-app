"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, QrCode, Calendar, Clock, CheckCircle } from "lucide-react"

export function PickupService() {
  const { t } = useLanguage()
  const [isRequested, setIsRequested] = useState(false)
  const [wasteType, setWasteType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsRequested(true)
  }

  if (isRequested) {
    return (
      <Card className="border-0 shadow-lg rounded-[20px]">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Pickup Scheduled!</h3>
            <p className="text-muted-foreground">
              A collector will arrive at your location. Show the QR code to earn points.
            </p>
          </div>
          <div className="p-6 bg-secondary rounded-xl inline-block">
            <QrCode className="w-32 h-32 mx-auto" />
            <p className="text-sm text-muted-foreground mt-2">Scan to verify pickup</p>
          </div>
          <div className="flex gap-4 justify-center text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Today
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              2:00 PM - 4:00 PM
            </span>
          </div>
          <Button variant="outline" onClick={() => setIsRequested(false)} className="rounded-xl">
            Request Another Pickup
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="w-5 h-5 text-primary" />
          {t("pickupService")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Waste Type</Label>
            <Select value={wasteType} onValueChange={setWasteType}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select waste type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organic">{t("organic")}</SelectItem>
                <SelectItem value="paper">{t("paper")}</SelectItem>
                <SelectItem value="plastic">{t("plastic")}</SelectItem>
                <SelectItem value="glass">{t("glass")}</SelectItem>
                <SelectItem value="hazardous">{t("hazardous")}</SelectItem>
                <SelectItem value="general">{t("general")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Address</Label>
            <Input placeholder="Enter your pickup address" className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label>Preferred Time</Label>
            <Select>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Notes (Optional)</Label>
            <Textarea placeholder="Any special instructions for the collector" className="rounded-xl resize-none" />
          </div>
          <Button type="submit" className="w-full h-12 rounded-xl text-lg">
            {t("requestPickup")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
