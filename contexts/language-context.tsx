"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useUser } from "./user-context"

export type Language = "en" | "ar" | null

interface Translations {
  [key: string]: {
    en: string
    ar: string
  }
}

export const translations: Translations = {
  // General
  appName: { en: "FERZA RECYCLE", ar: "فرزة للتدوير" },
  tagline: { en: "Recycle Today, Save Tomorrow", ar: "أعد التدوير اليوم، أنقذ الغد" },
  continue: { en: "Continue", ar: "متابعة" },
  submit: { en: "Submit", ar: "إرسال" },
  back: { en: "Back", ar: "رجوع" },
  logout: { en: "Logout", ar: "تسجيل الخروج" },
  close: { en: "Close", ar: "إغلاق" },
  send: { en: "Send", ar: "إرسال" },

  // Language Selection
  selectLanguage: { en: "Select Your Language", ar: "اختر لغتك" },
  english: { en: "English", ar: "الإنجليزية" },
  arabic: { en: "العربية", ar: "العربية" },

  // Auth
  welcome: { en: "Welcome", ar: "مرحباً" },
  login: { en: "Login", ar: "تسجيل الدخول" },
  signup: { en: "Sign Up", ar: "إنشاء حساب" },
  customer: { en: "Customer", ar: "زبون" },
  shopOwner: { en: "Shop Owner", ar: "صاحب محل" },
  selectRole: { en: "Select Your Role", ar: "اختر دورك" },
  name: { en: "Full Name", ar: "الاسم الكامل" },
  email: { en: "Email", ar: "البريد الإلكتروني" },
  password: { en: "Password", ar: "كلمة المرور" },
  dob: { en: "Date of Birth", ar: "تاريخ الميلاد" },
  nationalId: { en: "National ID (NID)", ar: "رقم الهوية الوطنية" },
  state: { en: "State", ar: "الولاية" },
  municipality: { en: "Municipality", ar: "البلدية" },
  nif: { en: "NIF (Tax ID)", ar: "الرقم الجبائي" },
  nic: { en: "NIC (Commerce ID)", ar: "رقم السجل التجاري" },
  alreadyHaveAccount: { en: "Already have an account?", ar: "لديك حساب بالفعل؟" },
  dontHaveAccount: { en: "Don't have an account?", ar: "ليس لديك حساب؟" },

  // Customer Dashboard
  dashboard: { en: "Dashboard", ar: "لوحة التحكم" },
  myPoints: { en: "My Points", ar: "نقاطي" },
  totalPoints: { en: "Total Points", ar: "إجمالي النقاط" },
  recyclingMap: { en: "Recycling Map", ar: "خريطة التدوير" },
  findBins: { en: "Find Recycling Bins", ar: "اعثر على صناديق التدوير" },
  leaderboard: { en: "Leaderboard", ar: "قائمة المتصدرين" },
  pickupService: { en: "Pickup Service", ar: "خدمة الجمع" },
  requestPickup: { en: "Request Pickup", ar: "طلب جمع النفايات" },
  ecoTips: { en: "Eco Tips", ar: "نصائح بيئية" },
  rewards: { en: "Rewards", ar: "المكافآت" },
  redeemPoints: { en: "Redeem Points", ar: "استبدال النقاط" },
  municipality_level: { en: "Municipality", ar: "البلدية" },
  state_level: { en: "State", ar: "الولاية" },
  national_level: { en: "National", ar: "وطني" },
  rank: { en: "Rank", ar: "الترتيب" },
  points: { en: "Points", ar: "نقاط" },

  aiEcoScan: { en: "AI Eco-Scan", ar: "المسح الذكي" },
  scanWaste: { en: "Scan Waste", ar: "مسح النفايات" },
  scanning: { en: "Scanning...", ar: "جاري المسح..." },
  scanResult: { en: "Scan Result", ar: "نتيجة المسح" },
  aiAssistant: { en: "AI Eco-Assistant", ar: "المساعد البيئي الذكي" },
  askQuestion: { en: "Ask a recycling question...", ar: "اسأل سؤالاً عن التدوير..." },
  smartPickup: { en: "Smart AI Pickup", ar: "جمع ذكي بالذكاء الاصطناعي" },
  requestAiPickup: { en: "Request AI-Route Pickup", ar: "طلب جمع بمسار ذكي" },
  co2Saved: { en: "CO2 Saved", ar: "ثاني أكسيد الكربون الموفر" },
  co2Ranking: { en: "CO2 Ranking", ar: "ترتيب توفير الكربون" },

  algiersMap: { en: "Algiers Recycling Map", ar: "خريطة تدوير الجزائر" },
  binLocation: { en: "Bin Location", ar: "موقع الصندوق" },
  binStatus: { en: "Bin Status", ar: "حالة الصناديق" },
  currentOffer: { en: "Current Offer", ar: "العرض الحالي" },
  getDirections: { en: "Get Directions", ar: "احصل على الاتجاهات" },
  smartBin: { en: "Smart Bin", ar: "صندوق ذكي" },

  predictiveAnalytics: { en: "Predictive Analytics", ar: "التحليلات التنبؤية" },
  predicted24h: { en: "Predicted Bin Fullness (24h)", ar: "التنبؤ بامتلاء الصناديق (24 ساعة)" },
  aiProfitCalc: { en: "AI Profit Calculator", ar: "حاسبة الأرباح الذكية" },
  taxSavings: { en: "Tax Savings", ar: "التوفير الضريبي" },
  wasteCollected: { en: "Waste Collected", ar: "النفايات المجمعة" },
  estimatedSavings: { en: "Estimated Savings", ar: "التوفير المقدر" },

  // Shop Owner Dashboard
  wasteAnalytics: { en: "Waste Analytics", ar: "تحليلات النفايات" },
  storeRanking: { en: "Store Ranking", ar: "ترتيب المتجر" },
  impactStats: { en: "Impact Statistics", ar: "إحصائيات التأثير" },
  govPerks: { en: "Government Perks", ar: "الامتيازات الحكومية" },
  healthSafety: { en: "Health & Safety", ar: "الصحة والسلامة" },
  customersServed: { en: "Customers Served", ar: "العملاء المخدومون" },
  estimatedProfit: { en: "Estimated Profit", ar: "الربح المقدر" },
  taxExemptions: { en: "Tax Exemptions", ar: "الإعفاءات الضريبية" },

  // Waste Categories
  organic: { en: "Organic", ar: "عضوي" },
  paper: { en: "Paper", ar: "ورق" },
  plastic: { en: "Plastic/Metal", ar: "بلاستيك/معدن" },
  general: { en: "General", ar: "عام" },
  hazardous: { en: "Hazardous", ar: "خطر" },
  glass: { en: "Glass", ar: "زجاج" },

  // Circular Economy translations
  carbonCredits: { en: "Carbon Credits", ar: "رصيد الكربون" },
  circularEconomy: { en: "Circular Economy", ar: "الاقتصاد الدائري" },

  // Customer - Green Hero Features
  spectralAnalysis: { en: "AI Spectral Analysis", ar: "التحليل الطيفي الذكي" },
  qualityScore: { en: "Quality Score", ar: "درجة الجودة" },
  materialPurity: { en: "Material Purity", ar: "نقاء المادة" },
  carbonTracker: { en: "Carbon Credit Tracker", ar: "متتبع رصيد الكربون" },
  environmentalLegacy: { en: "Environmental Legacy", ar: "الإرث البيئي" },
  treesSaved: { en: "Trees Saved", ar: "الأشجار المحفوظة" },
  waterConserved: { en: "Water Conserved", ar: "المياه الموفرة" },
  co2Reduced: { en: "CO2 Reduced", ar: "الكربون المخفض" },
  smartAlerts: { en: "Smart Attendance Alerts", ar: "تنبيهات الحضور الذكية" },
  doublePoints: { en: "Double Points", ar: "نقاط مضاعفة" },
  bestTimeVisit: { en: "Best Time to Visit", ar: "أفضل وقت للزيارة" },
  digitalPassport: { en: "Digital Waste Passport", ar: "جواز النفايات الرقمي" },
  wasteJourney: { en: "Waste Journey", ar: "رحلة النفايات" },
  trackingId: { en: "Tracking ID", ar: "رقم التتبع" },
  aiInsights: { en: "AI Insights", ar: "رؤى الذكاء الاصطناعي" },
  economy: { en: "Economy", ar: "الاقتصاد" },
  impact: { en: "Impact", ar: "التأثير" },

  // Shop Owner - Economy Pro Features
  wasteMarketplace: { en: "Waste Marketplace", ar: "بورصة النفايات" },
  marketPrice: { en: "Market Price", ar: "سعر السوق" },
  plasticPrice: { en: "Plastic Price", ar: "سعر البلاستيك" },
  aluminumPrice: { en: "Aluminum Price", ar: "سعر الألمنيوم" },
  paperPrice: { en: "Paper Price", ar: "سعر الورق" },
  bestTimeToSell: { en: "Best Time to Sell", ar: "أفضل وقت للبيع" },
  aiMarketing: { en: "AI Marketing Engine", ar: "محرك التسويق الذكي" },
  ecoPromotions: { en: "Eco Promotions", ar: "العروض البيئية" },
  demographics: { en: "Customer Demographics", ar: "التركيبة السكانية للعملاء" },
  hazardousDetector: { en: "Hazardous Waste Detector", ar: "كاشف النفايات الخطرة" },
  batteryAlert: { en: "Battery Alert", ar: "تنبيه البطارية" },
  medicalWaste: { en: "Medical Waste", ar: "نفايات طبية" },
  wasteHeatmap: { en: "Waste Heatmap", ar: "خريطة حرارية للنفايات" },
  highWasteZone: { en: "High Waste Zone", ar: "منطقة نفايات عالية" },
  optimizeRoutes: { en: "Optimize Routes", ar: "تحسين المسارات" },
  liveMarket: { en: "Live Market", ar: "السوق المباشر" },
  perKg: { en: "per kg", ar: "للكيلو" },
  trending: { en: "Trending", ar: "رائج" },
  trendingUp: { en: "Price Rising", ar: "السعر يرتفع" },
  trendingDown: { en: "Price Falling", ar: "السعر ينخفض" },

  // Accessibility-related translations
  easyAccessMode: { en: "Easy Access Mode", ar: "وضع الوصول السهل" },
  readAloud: { en: "Read Stats Aloud", ar: "اقرأ الإحصائيات بصوت عالٍ" },
  needHelp: { en: "Need Help?", ar: "هل تحتاج إلى مساعدة؟" },
  accessibilityFeatures: { en: "Accessibility Features", ar: "ميزات الوصول" },
  highContrast: { en: "High Contrast Mode", ar: "وضع التباين العالي" },
  largeText: { en: "Large Text", ar: "نص كبير" },
  voiceFeedback: { en: "Voice Feedback", ar: "ملاحظات صوتية" },
  easyAccessToggle: { en: "Switch to Easy Access Mode", ar: "التبديل إلى وضع الوصول السهل" },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(null)
  const { user } = useUser()

  useEffect(() => {
    const loadSavedLanguage = async () => {
      if (user?.id) {
        try {
          const response = await fetch(`/api/user-stats?userId=${user.id}`)
          const data = await response.json()
          if (data.language) {
            setLanguageState(data.language)
          }
        } catch (error) {
          console.error("Failed to load saved language:", error)
        }
      }
    }
    loadSavedLanguage()
  }, [user?.id])

  const setLanguage = async (lang: Language) => {
    setLanguageState(lang)
    if (user?.id && lang) {
      try {
        await fetch("/api/user-stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, language: lang }),
        })
      } catch (error) {
        console.error("Failed to save language preference:", error)
      }
    }
  }

  const t = (key: string): string => {
    if (!language) return key
    return translations[key]?.[language] || key
  }

  const dir = language === "ar" ? "rtl" : "ltr"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={language === "ar" ? "font-arabic" : "font-sans"}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
