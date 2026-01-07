"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { ErrorBoundary } from "@/components/error-boundary"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Scan, Phone, Volume2, Home, LogOut, Globe, HelpCircle } from "lucide-react"

const FALLBACK_STATS = {
  points: 156,
  trees: 12,
  water: 2450,
  co2: 48.5,
}

export function SpecialAccessDashboard() {
  const { t, language, setLanguage, dir } = useLanguage()
  const { user, logout } = useUser()
  const [stats, setStats] = useState(FALLBACK_STATS)
  const [isScanning, setIsScanning] = useState(false)
  const [helpRequested, setHelpRequested] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)

  useEffect(() => {
    // Announce page title for screen readers
    speakText(t("easyAccessMode"))
  }, [language, t])

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "ar" ? "ar-SA" : "en-US"
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleScan = async () => {
    setIsScanning(true)
    setScanResult(null)

    // Announce scanning
    speakText(language === "ar" ? "جاري مسح النفايات" : "Scanning waste")

    // Simulate AI analysis
    setTimeout(() => {
      const materials = ["Plastic Bottle", "Glass Jar", "Aluminum Can"]
      const points = [10, 15, 12]
      const randomIndex = Math.floor(Math.random() * materials.length)

      const result = `${materials[randomIndex]} - ${points[randomIndex]} Points`
      setScanResult(result)
      setStats((prev) => ({
        ...prev,
        points: prev.points + points[randomIndex],
      }))

      // Announce result
      speakText(
        language === "ar"
          ? `تم اكتشاف ${materials[randomIndex]}، حصلت على ${points[randomIndex]} نقطة`
          : `Detected ${materials[randomIndex]}, earned ${points[randomIndex]} points`,
      )

      setIsScanning(false)
    }, 3000)
  }

  const handleHelpRequest = () => {
    setHelpRequested(true)
    const message =
      language === "ar"
        ? "تم إرسال طلب المساعدة. سيصل المتطوعون قريباً"
        : "Help request sent. Volunteers will arrive shortly"

    speakText(message)

    setTimeout(() => {
      setHelpRequested(false)
    }, 5000)
  }

  return (
    <div className="min-h-screen bg-black text-yellow-400 p-4 md:p-6 space-y-6" dir={dir} suppressHydrationWarning>
      {/* Header with Language Toggle */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-4 border-yellow-400 p-6 rounded-lg">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t("easyAccessMode")}</h1>
          <p className="text-2xl">
            {t("welcome")}, {user?.name}
          </p>
        </div>
        <div className="flex gap-4">
          <Button
            onClick={() => {
              setLanguage(language === "en" ? "ar" : "en")
              speakText(language === "en" ? "تم تغيير اللغة إلى العربية" : "Language changed to English")
            }}
            className="h-20 px-8 text-xl font-bold bg-yellow-400 text-black hover:bg-yellow-300 rounded-lg border-2 border-yellow-400"
            aria-label={language === "en" ? "العربية" : "English"}
          >
            <Globe className="w-6 h-6 mr-2" />
            {language === "en" ? "العربية" : "English"}
          </Button>
          <Button
            onClick={logout}
            className="h-20 px-8 text-xl font-bold bg-red-600 text-yellow-400 hover:bg-red-700 rounded-lg border-2 border-yellow-400"
            aria-label={t("logout")}
          >
            <LogOut className="w-6 h-6 mr-2" />
            {t("logout")}
          </Button>
        </div>
      </header>

      {/* Points Display - Giant Card */}
      <Card className="bg-yellow-400 text-black border-4 border-yellow-400 rounded-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold">{t("myPoints")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-7xl font-bold text-center">{stats.points}</div>
        </CardContent>
      </Card>

      {/* Giant Scan Button */}
      <ErrorBoundary componentName="AccessibilityScan">
        <Button
          onClick={handleScan}
          disabled={isScanning}
          className="w-full h-32 text-4xl font-bold bg-yellow-400 text-black hover:bg-yellow-300 rounded-lg border-4 border-yellow-400 flex flex-col items-center justify-center gap-4 transition-all duration-300"
          aria-label={t("scanWaste")}
        >
          <Scan className="w-16 h-16" />
          {isScanning ? t("scanning") : t("scanWaste")}
        </Button>

        {/* Scan Result */}
        {scanResult && (
          <Card className="bg-green-600 text-yellow-400 border-4 border-yellow-400 rounded-lg">
            <CardContent className="p-6">
              <p className="text-3xl font-bold text-center">{scanResult}</p>
            </CardContent>
          </Card>
        )}
      </ErrorBoundary>

      {/* Giant Help Button */}
      <ErrorBoundary componentName="AccessibilityHelp">
        <Button
          onClick={handleHelpRequest}
          disabled={helpRequested}
          className="w-full h-32 text-4xl font-bold bg-red-600 text-yellow-400 hover:bg-red-700 rounded-lg border-4 border-yellow-400 flex flex-col items-center justify-center gap-4 transition-all duration-300"
          aria-label={language === "ar" ? "طلب مساعدة" : "Request Help"}
        >
          <Phone className="w-16 h-16" />
          {language === "ar" ? "طلب مساعدة" : "REQUEST HELP"}
        </Button>

        {helpRequested && (
          <Card className="bg-blue-600 text-yellow-400 border-4 border-yellow-400 rounded-lg">
            <CardContent className="p-6">
              <p className="text-2xl font-bold text-center">
                {language === "ar" ? "✓ تم إرسال الطلب. المتطوعون قادمون" : "✓ Help request sent. Volunteers arriving"}
              </p>
            </CardContent>
          </Card>
        )}
      </ErrorBoundary>

      {/* Voice Feedback Button */}
      <Button
        onClick={() =>
          speakText(
            language === "ar"
              ? `لديك ${stats.points} نقطة. لقد وفرت ${stats.trees} شجرة و ${stats.water} لتر من الماء`
              : `You have ${stats.points} points. You saved ${stats.trees} trees and ${stats.water} liters of water`,
          )
        }
        className="w-full h-20 text-2xl font-bold bg-purple-600 text-yellow-400 hover:bg-purple-700 rounded-lg border-4 border-yellow-400 flex items-center justify-center gap-4"
      >
        <Volume2 className="w-10 h-10" />
        {t("readAloud")}
      </Button>

      {/* Environmental Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-yellow-400 text-black border-4 border-yellow-400 rounded-lg">
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-center mb-2">{stats.trees}</p>
            <p className="text-2xl font-bold text-center">{t("treesSaved")}</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-600 text-yellow-400 border-4 border-yellow-400 rounded-lg">
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-center mb-2">{stats.water}L</p>
            <p className="text-2xl font-bold text-center">{t("waterConserved")}</p>
          </CardContent>
        </Card>

        <Card className="bg-green-600 text-yellow-400 border-4 border-yellow-400 rounded-lg">
          <CardContent className="p-6">
            <p className="text-3xl font-bold text-center mb-2">{stats.co2}kg</p>
            <p className="text-2xl font-bold text-center">{t("co2Reduced")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Help Info Card */}
      <Card className="bg-blue-600 text-yellow-400 border-4 border-yellow-400 rounded-lg">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-2">
            <HelpCircle className="w-8 h-8" />
            {t("needHelp")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl">
            {language === "ar"
              ? "اضغط على زر الاستغاثة الأحمر الكبير لطلب مساعدة من المتطوعين القريبين منك"
              : "Press the big red help button to request assistance from nearby volunteers"}
          </p>
        </CardContent>
      </Card>

      {/* Home Button (if multi-page needed in future) */}
      <Button className="w-full h-20 text-2xl font-bold bg-yellow-400 text-black hover:bg-yellow-300 rounded-lg border-4 border-yellow-400 flex items-center justify-center gap-2">
        <Home className="w-8 h-8" />
        {t("dashboard")}
      </Button>
    </div>
  )
}
