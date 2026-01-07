"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { PointsWallet } from "@/components/customer/points-wallet"
import { AlgiersMap } from "@/components/customer/algiers-map"
import { Leaderboard } from "@/components/customer/leaderboard"
import { SmartPickup } from "@/components/customer/smart-pickup"
import { EcoTips } from "@/components/customer/eco-tips"
import { RewardsStore } from "@/components/customer/rewards-store"
import { AiEcoScan } from "@/components/customer/ai-eco-scan"
import { AiAssistant } from "@/components/customer/ai-assistant"
import { CarbonTracker } from "@/components/customer/carbon-tracker"
import { SmartAlerts } from "@/components/customer/smart-alerts"
import { DigitalPassport } from "@/components/customer/digital-passport"
import { ErrorBoundary } from "@/components/error-boundary"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { SpecialAccessDashboard } from "@/components/customer/special-access-dashboard"

type CustomerView =
  | "dashboard"
  | "map"
  | "leaderboard"
  | "pickup"
  | "tips"
  | "rewards"
  | "ecoscan"
  | "assistant"
  | "carbon"
  | "alerts"
  | "passport"

export function CustomerDashboard() {
  const { t } = useLanguage()
  const { user } = useUser()
  const [activeView, setActiveView] = useState<CustomerView>("dashboard")

  if (user?.accessibilityMode) {
    return <SpecialAccessDashboard />
  }

  const renderContent = () => {
    switch (activeView) {
      case "map":
        return (
          <ErrorBoundary componentName="AlgiersMap">
            <AlgiersMap />
          </ErrorBoundary>
        )
      case "leaderboard":
        return (
          <ErrorBoundary componentName="Leaderboard">
            <Leaderboard />
          </ErrorBoundary>
        )
      case "pickup":
        return (
          <ErrorBoundary componentName="SmartPickup">
            <SmartPickup />
          </ErrorBoundary>
        )
      case "tips":
        return (
          <ErrorBoundary componentName="EcoTips">
            <EcoTips />
          </ErrorBoundary>
        )
      case "rewards":
        return (
          <ErrorBoundary componentName="RewardsStore">
            <RewardsStore />
          </ErrorBoundary>
        )
      case "ecoscan":
        return (
          <ErrorBoundary componentName="AiEcoScan">
            <AiEcoScan />
          </ErrorBoundary>
        )
      case "assistant":
        return (
          <ErrorBoundary componentName="AiAssistant">
            <AiAssistant />
          </ErrorBoundary>
        )
      case "carbon":
        return (
          <ErrorBoundary componentName="CarbonTracker">
            <CarbonTracker />
          </ErrorBoundary>
        )
      case "alerts":
        return (
          <ErrorBoundary componentName="SmartAlerts">
            <SmartAlerts />
          </ErrorBoundary>
        )
      case "passport":
        return (
          <ErrorBoundary componentName="DigitalPassport">
            <DigitalPassport />
          </ErrorBoundary>
        )
      default:
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <ErrorBoundary componentName="PointsWallet">
                <PointsWallet />
              </ErrorBoundary>
              <ErrorBoundary componentName="AiEcoScan">
                <AiEcoScan />
              </ErrorBoundary>
              <ErrorBoundary componentName="SmartAlerts">
                <SmartAlerts />
              </ErrorBoundary>
            </div>
            <div className="space-y-6">
              <ErrorBoundary componentName="CarbonTracker">
                <CarbonTracker />
              </ErrorBoundary>
              <ErrorBoundary componentName="AlgiersMap">
                <AlgiersMap compact />
              </ErrorBoundary>
              <ErrorBoundary componentName="DigitalPassport">
                <DigitalPassport />
              </ErrorBoundary>
            </div>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <DashboardSidebar
        role="customer"
        activeView={activeView}
        setActiveView={(view) => setActiveView(view as CustomerView)}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold">
              {t("welcome")}, {user?.name}
            </h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{renderContent()}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
