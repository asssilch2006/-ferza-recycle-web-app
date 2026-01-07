"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Globe } from "lucide-react"

export function LanguageSelection() {
  const { setLanguage } = useLanguage()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-28 h-28 pulse-glow rounded-full">
            <img
              src="/images/green-20-20-20white-20simple-20recycle-20logo-20-281-29.png"
              alt="Ferza Recycle Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center -mt-1">
            <h1 className="text-4xl font-bold tracking-tight" style={{ color: "#1d9944" }}>
              FERZA
            </h1>
            <p className="text-xl font-bold tracking-[0.25em]" style={{ color: "#1d9944" }}>
              RECYCLE
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-lg rounded-[20px] card-hover">
          <CardContent className="p-6 space-y-6">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Globe className="w-5 h-5 nav-icon-hover" />
              <span className="text-lg font-medium">Select Your Language / اختر لغتك</span>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => setLanguage("en")}
                className="w-full h-14 text-lg font-semibold rounded-xl btn-ferza text-white"
              >
                English
              </Button>
              <Button
                onClick={() => setLanguage("ar")}
                className="w-full h-14 text-lg font-semibold rounded-xl btn-ferza text-white"
              >
                العربية
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
