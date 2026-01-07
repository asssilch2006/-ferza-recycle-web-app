"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Gift } from "lucide-react"

interface BinLocation {
  id: string
  name: string
  address: string
  distance: string
  offer: string
  types: string[]
}

const mockBins: BinLocation[] = [
  {
    id: "1",
    name: "EcoMart Store",
    address: "123 Green St, Algiers",
    distance: "0.5 km",
    offer: "20% off on eco products",
    types: ["organic", "paper", "plastic"],
  },
  {
    id: "2",
    name: "Clean City Hub",
    address: "45 Recycle Ave, Algiers",
    distance: "1.2 km",
    offer: "50 bonus points",
    types: ["glass", "hazardous", "general"],
  },
  {
    id: "3",
    name: "GreenLife Center",
    address: "78 Nature Blvd, Algiers",
    distance: "2.0 km",
    offer: "Free reusable bag",
    types: ["organic", "plastic", "glass"],
  },
]

export function RecyclingMap({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage()
  const [selectedBin, setSelectedBin] = useState<BinLocation | null>(null)

  const displayBins = compact ? mockBins.slice(0, 2) : mockBins

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {t("recyclingMap")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!compact && (
          <div className="relative h-48 bg-secondary rounded-xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-primary" />
                <p className="text-sm">{t("findBins")}</p>
              </div>
            </div>
            {/* Map placeholder with animated pins */}
            <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full animate-pulse" />
            <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-primary rounded-full animate-pulse [animation-delay:0.5s]" />
            <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-primary rounded-full animate-pulse [animation-delay:1s]" />
          </div>
        )}

        <div className="space-y-3">
          {displayBins.map((bin) => (
            <div
              key={bin.id}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedBin?.id === bin.id ? "border-primary bg-primary/5" : "border-transparent bg-secondary"
              }`}
              onClick={() => setSelectedBin(bin)}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-semibold">{bin.name}</h4>
                  <p className="text-sm text-muted-foreground">{bin.address}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {bin.distance}
                    </span>
                    <span className="flex items-center gap-1 text-primary">
                      <Gift className="w-3 h-3" />
                      {bin.offer}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-lg bg-transparent">
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-2">
                {bin.types.map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {t(type)}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
