"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { BinVisualizer } from "@/components/shop-owner/bin-visualizer"
import { WasteAnalytics } from "@/components/shop-owner/waste-analytics"
import { StoreRanking } from "@/components/shop-owner/store-ranking"
import { ImpactStats } from "@/components/shop-owner/impact-stats"
import { GovPerks } from "@/components/shop-owner/gov-perks"
import { HealthSafetyTips } from "@/components/shop-owner/health-safety-tips"
import { PredictiveAnalytics } from "@/components/shop-owner/predictive-analytics"
import { AiProfitCalculator } from "@/components/shop-owner/ai-profit-calculator"
import { WasteMarketplace } from "@/components/shop-owner/waste-marketplace"
import { AiMarketing } from "@/components/shop-owner/ai-marketing"
import { HazardousDetector } from "@/components/shop-owner/hazardous-detector"
import { WasteHeatmap } from "@/components/shop-owner/waste-heatmap"
import { ErrorBoundary } from "@/components/error-boundary"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

type ShopOwnerView =
  | "dashboard"
  | "bins"
  | "analytics"
  | "ranking"
  | "impact"
  | "perks"
  | "safety"
  | "predictions"
  | "profit"
  | "marketplace"
  | "marketing"
  | "hazardous"
  | "heatmap"

export function ShopOwnerDashboard() {
  const { t } = useLanguage()
  const { user } = useUser()
  const [activeView, setActiveView] = useState<ShopOwnerView>("dashboard")

  const renderContent = () => {
    switch (activeView) {
      case "bins":
        return (
          <ErrorBoundary componentName="BinVisualizer">
            <BinVisualizer />
          </ErrorBoundary>
        )
      case "analytics":
        return (
          <ErrorBoundary componentName="WasteAnalytics">
            <WasteAnalytics />
          </ErrorBoundary>
        )
      case "ranking":
        return (
          <ErrorBoundary componentName="StoreRanking">
            <StoreRanking />
          </ErrorBoundary>
        )
      case "impact":
        return (
          <ErrorBoundary componentName="ImpactStats">
            <ImpactStats />
          </ErrorBoundary>
        )
      case "perks":
        return (
          <ErrorBoundary componentName="GovPerks">
            <GovPerks />
          </ErrorBoundary>
        )
      case "safety":
        return (
          <ErrorBoundary componentName="HealthSafetyTips">
            <HealthSafetyTips />
          </ErrorBoundary>
        )
      case "predictions":
        return (
          <ErrorBoundary componentName="PredictiveAnalytics">
            <PredictiveAnalytics />
          </ErrorBoundary>
        )
      case "profit":
        return (
          <ErrorBoundary componentName="AiProfitCalculator">
            <AiProfitCalculator />
          </ErrorBoundary>
        )
      case "marketplace":
        return (
          <ErrorBoundary componentName="WasteMarketplace">
            <WasteMarketplace />
          </ErrorBoundary>
        )
      case "marketing":
        return (
          <ErrorBoundary componentName="AiMarketing">
            <AiMarketing />
          </ErrorBoundary>
        )
      case "hazardous":
        return (
          <ErrorBoundary componentName="HazardousDetector">
            <HazardousDetector />
          </ErrorBoundary>
        )
      case "heatmap":
        return (
          <ErrorBoundary componentName="WasteHeatmap">
            <WasteHeatmap />
          </ErrorBoundary>
        )
      default:
        return (
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <ErrorBoundary componentName="BinVisualizer">
                <BinVisualizer />
              </ErrorBoundary>
              <ErrorBoundary componentName="WasteMarketplace">
                <WasteMarketplace />
              </ErrorBoundary>
              <ErrorBoundary componentName="HazardousDetector">
                <HazardousDetector />
              </ErrorBoundary>
            </div>
            <div className="space-y-6">
              <ErrorBoundary componentName="AiProfitCalculator">
                <AiProfitCalculator />
              </ErrorBoundary>
              <ErrorBoundary componentName="PredictiveAnalytics">
                <PredictiveAnalytics />
              </ErrorBoundary>
              <ErrorBoundary componentName="WasteHeatmap">
                <WasteHeatmap />
              </ErrorBoundary>
            </div>
          </div>
        )
    }
  }

  return (
    <SidebarProvider>
      <DashboardSidebar
        role="shop_owner"
        activeView={activeView}
        setActiveView={(view) => setActiveView(view as ShopOwnerView)}
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
