"use client"

import { useEffect, useState } from "react"

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background transition-opacity duration-500">
      <div
        className={`flex flex-col items-center gap-6 transition-all duration-1000 ease-out ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="relative w-36 h-36">
          <img
            src="/images/green-20-20-20white-20simple-20recycle-20logo-20-281-29.png"
            alt="Ferza Recycle Logo"
            className="w-full h-full object-contain"
            style={{ mixBlendMode: "multiply" }}
          />
        </div>
        <div className="text-center -mt-2">
          <h1 className="text-5xl font-bold tracking-tight" style={{ color: "#1d9944" }}>
            FERZA
          </h1>
          <p className="text-2xl font-semibold tracking-[0.25em] mt-1" style={{ color: "#1d9944" }}>
            RECYCLE
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-1">Recycle Today, Save Tomorrow</p>
        <div className="flex gap-2 mt-4">
          <div
            className="w-3 h-3 rounded-full animate-bounce [animation-delay:-0.3s]"
            style={{ backgroundColor: "#1d9944" }}
          />
          <div
            className="w-3 h-3 rounded-full animate-bounce [animation-delay:-0.15s]"
            style={{ backgroundColor: "#1d9944" }}
          />
          <div className="w-3 h-3 rounded-full animate-bounce" style={{ backgroundColor: "#1d9944" }} />
        </div>
      </div>
    </div>
  )
}
