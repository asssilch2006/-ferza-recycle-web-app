"use client"

import { useState, useEffect } from "react"
import { SplashScreen } from "@/components/splash-screen"
import { LanguageSelection } from "@/components/language-selection"
import { AuthScreen } from "@/components/auth-screen"
import { CustomerDashboard } from "@/components/customer/customer-dashboard"
import { ShopOwnerDashboard } from "@/components/shop-owner/shop-owner-dashboard"
import { LanguageProvider, useLanguage } from "@/contexts/language-context"
import { UserProvider, useUser } from "@/contexts/user-context"

function AppContent() {
  const [showSplash, setShowSplash] = useState(true)
  const { language } = useLanguage()
  const { user, isAuthenticated } = useUser()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) {
    return <SplashScreen />
  }

  if (!language) {
    return <LanguageSelection />
  }

  if (!isAuthenticated) {
    return <AuthScreen />
  }

  if (user?.role === "shop_owner") {
    return <ShopOwnerDashboard />
  }

  return <CustomerDashboard />
}

export default function Home() {
  return (
    <LanguageProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </LanguageProvider>
  )
}
