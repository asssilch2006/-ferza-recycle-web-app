"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation, Gift } from "lucide-react"

// استيراد ملفات التنسيق الخاصة بالخريطة
import "leaflet/dist/leaflet.css"

// --- استيراد الخريطة بشكل ديناميكي لمنع أخطاء السيرفر في Next.js ---
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false })
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false })

interface BinLocation {
  id: string
  name: string
  address: string
  distance: string
  offer: string
  types: string[]
  lat: number
  lng: number
}

// بيانات تجريبية لمواقع في الجزائر العاصمة
const mockBins: BinLocation[] = [
  {
    id: "1",
    name: "EcoMart Store",
    address: "وسط المدينة، الجزائر",
    distance: "0.5 km",
    offer: "خصم 20% على المنتجات البيئية",
    types: ["organic", "paper", "plastic"],
    lat: 36.7538,
    lng: 3.0588,
  },
  {
    id: "2",
    name: "Clean City Hub",
    address: "باب الزوار، الجزائر",
    distance: "1.2 km",
    offer: "50 نقطة مكافأة",
    types: ["glass", "hazardous", "general"],
    lat: 36.7118,
    lng: 3.1739,
  },
  {
    id: "3",
    name: "GreenLife Center",
    address: "بن عكنون، الجزائر",
    distance: "2.0 km",
    offer: "حقيبة قابلة لإعادة الاستخدام مجاناً",
    types: ["organic", "plastic", "glass"],
    lat: 36.7525,
    lng: 3.0254,
  },
]

export function RecyclingMap({ compact = false }: { compact?: boolean }) {
  const { t } = useLanguage()
  const [selectedBin, setSelectedBin] = useState<BinLocation | null>(null)
  const [customIcon, setCustomIcon] = useState<any>(null)

  // إعداد أيقونة الخريطة بعد تحميل الصفحة
  useEffect(() => {
    const L = require("leaflet")
    const icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    })
    setCustomIcon(icon)
  }, [])

  const displayBins = compact ? mockBins.slice(0, 2) : mockBins

  return (
    <Card className="border-0 shadow-lg rounded-[20px] overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          {t("recyclingMap")}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!compact && (
          <div className="relative h-64 bg-secondary rounded-xl overflow-hidden border z-0">
            {/* خريطة الجزائر الحقيقية */}
            <MapContainer
              center={[36.7538, 3.0588]}
              zoom={11}
              style={{ height: "100%", width: "100%" }}
            ></MapContainer>