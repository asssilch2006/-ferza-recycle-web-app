"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Navigation, Gift, Trash2, ExternalLink, Search, Loader2 } from "lucide-react"

interface SmartBinLocation {
  id: string
  name: string
  nameAr: string
  address: string
  addressAr: string
  lat: number
  lng: number
  status: "available" | "almost_full" | "full"
  fillLevel: number
  offer: string
  offerAr: string
  types: string[]
  neighborhood: string
}

const FALLBACK_BINS: SmartBinLocation[] = [
  {
    id: "bin-1",
    name: "Hydra Smart Bin",
    nameAr: "صندوق حيدرة الذكي",
    address: "Rue des Pins, Hydra",
    addressAr: "شارع الصنوبر، حيدرة",
    lat: 36.7538,
    lng: 3.0188,
    status: "available",
    fillLevel: 35,
    offer: "2x Points Today!",
    offerAr: "نقاط مضاعفة اليوم!",
    types: ["plastic", "glass", "aluminum"],
    neighborhood: "Hydra",
  },
  {
    id: "bin-2",
    name: "Bab Ezzouar Center",
    nameAr: "مركز باب الزوار",
    address: "Near Bab Ezzouar Mall",
    addressAr: "بالقرب من مول باب الزوار",
    lat: 36.7206,
    lng: 3.1834,
    status: "almost_full",
    fillLevel: 75,
    offer: "Free Coffee Voucher",
    offerAr: "قسيمة قهوة مجانية",
    types: ["plastic", "paper", "glass"],
    neighborhood: "Bab Ezzouar",
  },
  {
    id: "bin-3",
    name: "Said Hamdine Station",
    nameAr: "محطة سعيد حمدين",
    address: "Metro Station, Said Hamdine",
    addressAr: "محطة المترو، سعيد حمدين",
    lat: 36.7389,
    lng: 3.0456,
    status: "available",
    fillLevel: 20,
    offer: "10% Discount at Partner Stores",
    offerAr: "خصم 10% في المتاجر الشريكة",
    types: ["plastic", "aluminum", "paper"],
    neighborhood: "Said Hamdine",
  },
  {
    id: "bin-4",
    name: "Didouche Mourad Bin",
    nameAr: "صندوق ديدوش مراد",
    address: "Avenue Didouche Mourad",
    addressAr: "شارع ديدوش مراد",
    lat: 36.7667,
    lng: 3.0589,
    status: "available",
    fillLevel: 45,
    offer: "Bonus 5 Points",
    offerAr: "مكافأة 5 نقاط",
    types: ["glass", "plastic"],
    neighborhood: "Didouche Mourad",
  },
  {
    id: "bin-5",
    name: "El Biar Green Point",
    nameAr: "نقطة الأبيار الخضراء",
    address: "Place El Biar",
    addressAr: "ساحة الأبيار",
    lat: 36.77,
    lng: 3.03,
    status: "full",
    fillLevel: 98,
    offer: "Check back tomorrow!",
    offerAr: "عد غداً!",
    types: ["plastic", "paper", "glass", "aluminum"],
    neighborhood: "El Biar",
  },
]

const statusColors = {
  available: "bg-green-500",
  almost_full: "bg-yellow-500",
  full: "bg-red-500",
}

const statusLabels = {
  available: { en: "Available", ar: "متاح" },
  almost_full: { en: "Almost Full", ar: "شبه ممتلئ" },
  full: { en: "Full", ar: "ممتلئ" },
}

export function AlgiersMap({ compact = false }: { compact?: boolean }) {
  const { t, language } = useLanguage()
  const [selectedBin, setSelectedBin] = useState<SmartBinLocation | null>(null)
  const [bins, setBins] = useState<SmartBinLocation[]>(FALLBACK_BINS) // Initialize with fallback
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false) // Start as false since we have fallback

  useEffect(() => {
    const fetchBins = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/search-bins?q=${encodeURIComponent(searchQuery)}&lang=${language}`)

        // Check if response is ok before parsing
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const text = await response.text()

        // Try to parse JSON, fallback if invalid
        let data
        try {
          data = JSON.parse(text)
        } catch {
          throw new Error("Invalid JSON response")
        }

        if (data.success && data.bins?.length > 0) {
          setBins(data.bins)
        } else {
          // Use fallback filtered by search query
          const filtered = filterFallbackBins(searchQuery, language)
          setBins(filtered)
        }
      } catch (error) {
        console.error("Failed to fetch bins, using fallback:", error)
        // Use fallback bins filtered by search query
        const filtered = filterFallbackBins(searchQuery, language)
        setBins(filtered)
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(fetchBins, 300)
    return () => clearTimeout(debounce)
  }, [searchQuery, language])

  const filterFallbackBins = (query: string, lang: string): SmartBinLocation[] => {
    if (!query.trim()) return FALLBACK_BINS

    const q = query.toLowerCase()
    return FALLBACK_BINS.filter((bin) => {
      const searchableText =
        lang === "ar"
          ? `${bin.nameAr} ${bin.addressAr} ${bin.neighborhood}`.toLowerCase()
          : `${bin.name} ${bin.address} ${bin.neighborhood}`.toLowerCase()
      return searchableText.includes(q) || bin.types.some((type) => type.includes(q))
    })
  }

  const displayBins = compact ? bins.slice(0, 3) : bins

  return (
    <Card className="border-0 shadow-lg rounded-[20px]">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {t("algiersMap")}
          {isLoading && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search input */}
        {!compact && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={language === "ar" ? "ابحث عن صندوق قريب..." : "Search for nearby bins..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Interactive Map */}
        {!compact && (
          <div className="relative h-64 bg-[#e8f4e8] rounded-xl overflow-hidden border-2 border-primary/20">
            <svg viewBox="0 0 400 250" className="w-full h-full">
              {/* Mediterranean Sea */}
              <path d="M 0 0 L 400 0 L 400 80 Q 300 100 200 85 Q 100 70 0 90 Z" fill="#a8d4e6" />
              <text x="200" y="40" textAnchor="middle" fill="#5a9ab8" fontSize="12" fontWeight="500">
                {language === "ar" ? "البحر المتوسط" : "Mediterranean Sea"}
              </text>

              {/* Land mass */}
              <path d="M 0 90 Q 100 70 200 85 Q 300 100 400 80 L 400 250 L 0 250 Z" fill="#d4e8d4" />

              {/* Main roads */}
              <path d="M 50 120 Q 200 140 350 110" stroke="#ccc" strokeWidth="3" fill="none" />
              <path d="M 100 180 Q 200 160 300 190" stroke="#ccc" strokeWidth="2" fill="none" />

              {/* City label */}
              <text x="200" y="130" textAnchor="middle" fill="#1d9944" fontSize="14" fontWeight="bold">
                {language === "ar" ? "الجزائر العاصمة" : "ALGIERS"}
              </text>

              {/* Smart Bin Pins */}
              {bins.slice(0, 8).map((bin, index) => {
                const x = 50 + (index % 4) * 90 + (index > 3 ? 20 : 0)
                const y = 100 + Math.floor(index / 4) * 60 + (index % 2) * 20

                return (
                  <g key={bin.id} className="cursor-pointer map-pin" onClick={() => setSelectedBin(bin)}>
                    <ellipse cx={x} cy={y + 18} rx="8" ry="3" fill="rgba(0,0,0,0.2)" />
                    <path
                      d={`M ${x} ${y + 15} C ${x - 12} ${y} ${x - 12} ${y - 15} ${x} ${y - 15} C ${x + 12} ${y - 15} ${x + 12} ${y} ${x} ${y + 15}`}
                      fill={bin.status === "full" ? "#ef4444" : bin.status === "almost_full" ? "#eab308" : "#1d9944"}
                      stroke="#fff"
                      strokeWidth="2"
                    />
                    <circle cx={x} cy={y - 5} r="6" fill="white" />
                    <text x={x} y={y - 2} textAnchor="middle" fontSize="8" fill="#1d9944">
                      ♻
                    </text>
                  </g>
                )
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 flex gap-2 bg-white/90 p-2 rounded-lg text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                {language === "ar" ? "متاح" : "Available"}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-yellow-500" />
                {language === "ar" ? "شبه ممتلئ" : "Almost Full"}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                {language === "ar" ? "ممتلئ" : "Full"}
              </span>
            </div>
          </div>
        )}

        {/* Bin List */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto">
          {displayBins.map((bin) => (
            <div
              key={bin.id}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                selectedBin?.id === bin.id ? "border-primary bg-primary/5" : "border-transparent bg-secondary"
              }`}
              onClick={() => setSelectedBin(bin)}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{language === "ar" ? bin.nameAr : bin.name}</h4>
                    <span className={`w-2 h-2 rounded-full ${statusColors[bin.status]}`} />
                  </div>
                  <p className="text-sm text-muted-foreground">{language === "ar" ? bin.addressAr : bin.address}</p>
                  <div className="flex items-center gap-3 text-sm mt-1">
                    <span className="flex items-center gap-1 text-primary">
                      <Gift className="w-3 h-3" />
                      {language === "ar" ? bin.offerAr : bin.offer}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge
                    variant={
                      bin.status === "full" ? "destructive" : bin.status === "almost_full" ? "secondary" : "default"
                    }
                  >
                    {bin.fillLevel}%
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {bin.types.map((type) => (
                  <Badge key={type} variant="outline" className="text-xs">
                    {t(type)}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Bin Dialog */}
        <Dialog open={!!selectedBin} onOpenChange={() => setSelectedBin(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-primary" />
                {t("smartBin")}
              </DialogTitle>
            </DialogHeader>
            {selectedBin && (
              <div className="space-y-4">
                <div className="p-4 bg-secondary rounded-xl">
                  <h3 className="font-bold text-lg">{language === "ar" ? selectedBin.nameAr : selectedBin.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar" ? selectedBin.addressAr : selectedBin.address}
                  </p>
                </div>

                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <span>{t("binStatus")}</span>
                  <Badge className={`${statusColors[selectedBin.status]} text-white`}>
                    {statusLabels[selectedBin.status][language || "en"]} - {selectedBin.fillLevel}%
                  </Badge>
                </div>

                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm font-medium flex items-center gap-2">
                    <Gift className="w-4 h-4 text-primary" />
                    {t("currentOffer")}:
                  </p>
                  <p className="text-primary font-semibold mt-1">
                    {language === "ar" ? selectedBin.offerAr : selectedBin.offer}
                  </p>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {selectedBin.types.map((type) => (
                    <Badge key={type} variant="secondary">
                      {t(type)}
                    </Badge>
                  ))}
                </div>

                <Button
                  className="w-full rounded-xl gap-2"
                  style={{ backgroundColor: "#1d9944" }}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/dir/?api=1&destination=${selectedBin.lat},${selectedBin.lng}`,
                      "_blank",
                    )
                  }
                >
                  <Navigation className="w-4 h-4" />
                  {t("getDirections")}
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  )
}
