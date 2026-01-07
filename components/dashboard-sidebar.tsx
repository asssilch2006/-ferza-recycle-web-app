"use client"

import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  MapPin,
  Trophy,
  Leaf,
  Gift,
  Trash2,
  BarChart3,
  Award,
  TrendingUp,
  Building,
  ShieldCheck,
  LogOut,
  Globe,
  Scan,
  Bot,
  Calculator,
  Route,
  TreePine,
  Bell,
  QrCode,
  LineChart,
  Megaphone,
  AlertTriangle,
  Map,
  Sparkles,
  DollarSign,
  Target,
  Accessibility,
} from "lucide-react"

interface DashboardSidebarProps {
  role: "customer" | "shop_owner"
  activeView: string
  setActiveView: (view: string) => void
}

const customerMenuGroups = [
  {
    labelKey: "dashboard",
    items: [{ id: "dashboard", icon: LayoutDashboard, labelKey: "dashboard" }],
  },
  {
    labelKey: "aiInsights",
    items: [
      { id: "ecoscan", icon: Scan, labelKey: "spectralAnalysis" },
      { id: "assistant", icon: Bot, labelKey: "aiAssistant" },
      { id: "alerts", icon: Bell, labelKey: "smartAlerts" },
    ],
  },
  {
    labelKey: "economy",
    items: [
      { id: "map", icon: MapPin, labelKey: "recyclingMap" },
      { id: "pickup", icon: Route, labelKey: "smartPickup" },
      { id: "passport", icon: QrCode, labelKey: "digitalPassport" },
    ],
  },
  {
    labelKey: "impact",
    items: [
      { id: "carbon", icon: TreePine, labelKey: "carbonTracker" },
      { id: "leaderboard", icon: Trophy, labelKey: "leaderboard" },
      { id: "tips", icon: Leaf, labelKey: "ecoTips" },
      { id: "rewards", icon: Gift, labelKey: "rewards" },
    ],
  },
]

const shopOwnerMenuGroups = [
  {
    labelKey: "dashboard",
    items: [{ id: "dashboard", icon: LayoutDashboard, labelKey: "dashboard" }],
  },
  {
    labelKey: "aiInsights",
    items: [
      { id: "predictions", icon: TrendingUp, labelKey: "predictiveAnalytics" },
      { id: "hazardous", icon: AlertTriangle, labelKey: "hazardousDetector" },
      { id: "heatmap", icon: Map, labelKey: "wasteHeatmap" },
    ],
  },
  {
    labelKey: "economy",
    items: [
      { id: "marketplace", icon: LineChart, labelKey: "wasteMarketplace" },
      { id: "profit", icon: Calculator, labelKey: "aiProfitCalc" },
      { id: "marketing", icon: Megaphone, labelKey: "aiMarketing" },
    ],
  },
  {
    labelKey: "impact",
    items: [
      { id: "bins", icon: Trash2, labelKey: "binStatus" },
      { id: "analytics", icon: BarChart3, labelKey: "wasteAnalytics" },
      { id: "ranking", icon: Award, labelKey: "storeRanking" },
      { id: "perks", icon: Building, labelKey: "govPerks" },
      { id: "safety", icon: ShieldCheck, labelKey: "healthSafety" },
    ],
  },
]

export function DashboardSidebar({ role, activeView, setActiveView }: DashboardSidebarProps) {
  const { t, language, setLanguage } = useLanguage()
  const { logout, toggleAccessibilityMode } = useUser()

  const menuGroups = role === "customer" ? customerMenuGroups : shopOwnerMenuGroups

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <img
              src="/images/green-20-20-20white-20simple-20recycle-20logo-20-281-29.png"
              alt="Ferza Recycle"
              className="w-full h-full object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
          <div className="group-data-[collapsible=icon]:hidden">
            <h2 className="font-bold text-lg" style={{ color: "#1d9944" }}>
              FERZA
            </h2>
            <p className="text-xs font-semibold tracking-wider" style={{ color: "#1d9944" }}>
              RECYCLE
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuGroups.map((group, groupIndex) => (
          <SidebarGroup key={groupIndex}>
            {groupIndex > 0 && (
              <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                {group.labelKey === "aiInsights" && <Sparkles className="w-3 h-3" style={{ color: "#1d9944" }} />}
                {group.labelKey === "economy" && <DollarSign className="w-3 h-3" style={{ color: "#1d9944" }} />}
                {group.labelKey === "impact" && <Target className="w-3 h-3" style={{ color: "#1d9944" }} />}
                <span className="group-data-[collapsible=icon]:hidden">{t(group.labelKey)}</span>
              </SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setActiveView(item.id)}
                      isActive={activeView === item.id}
                      className="rounded-xl sidebar-btn-hover"
                      tooltip={t(item.labelKey)}
                    >
                      <item.icon className="w-5 h-5 nav-icon-hover" />
                      <span>{t(item.labelKey)}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 space-y-2">
        {role === "customer" && (
          <Button
            variant="ghost"
            className="w-full justify-start rounded-xl group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 sidebar-btn-hover"
            onClick={toggleAccessibilityMode}
            title={language === "ar" ? "وضع الوصول السهل" : "Easy Access Mode"}
          >
            <Accessibility className="w-5 h-5 group-data-[collapsible=icon]:mr-0 mr-2 nav-icon-hover" />
            <span className="group-data-[collapsible=icon]:hidden">
              {language === "ar" ? "وضع الوصول" : "Easy Access"}
            </span>
          </Button>
        )}
        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 sidebar-btn-hover"
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
        >
          <Globe className="w-5 h-5 group-data-[collapsible=icon]:mr-0 mr-2 nav-icon-hover" />
          <span className="group-data-[collapsible=icon]:hidden">{language === "en" ? "العربية" : "English"}</span>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start rounded-xl text-destructive hover:text-destructive group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 sidebar-btn-hover"
          onClick={logout}
        >
          <LogOut className="w-5 h-5 group-data-[collapsible=icon]:mr-0 mr-2" />
          <span className="group-data-[collapsible=icon]:hidden">{t("logout")}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
