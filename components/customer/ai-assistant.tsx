"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User, Sparkles, Brain } from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

const knowledgeBase: Record<string, { en: string; ar: string; keywords: string[] }> = {
  law: {
    keywords: ["law", "legal", "regulation", "قانون", "تشريع", "لوائح"],
    en: `According to Algerian Law 01-19 (December 12, 2001) regarding waste management and control:

• Article 3: Defines waste management principles including reduction, recycling, and recovery
• Article 5: Mandates waste sorting at source for all citizens and businesses
• Article 14: Establishes penalties for illegal dumping (up to 100,000 DZD fine)
• Article 20: Provides tax incentives for businesses engaged in recycling activities

FERZA RECYCLE helps you comply with these regulations while earning rewards!`,
    ar: `وفقاً للقانون الجزائري 01-19 (12 ديسمبر 2001) المتعلق بتسيير النفايات ومراقبتها:

• المادة 3: تحدد مبادئ تسيير النفايات بما في ذلك التقليل والتدوير والاسترجاع
• المادة 5: تفرض فرز النفايات من المصدر لجميع المواطنين والمؤسسات
• المادة 14: تحدد عقوبات الرمي غير القانوني (غرامة تصل إلى 100,000 دج)
• المادة 20: توفر حوافز ضريبية للمؤسسات العاملة في أنشطة التدوير

فرزة للتدوير تساعدك على الامتثال لهذه اللوائح مع كسب المكافآت!`,
  },
  safety: {
    keywords: ["safety", "safe", "health", "protect", "gloves", "سلامة", "صحة", "حماية", "قفازات", "آمن"],
    en: `Health & Safety Guidelines for Recycling:

🧤 ALWAYS wear gloves when handling waste materials
🧼 Wash hands thoroughly with soap after sorting waste
⚠️ Handle medical waste (masks, syringes) with extreme care - use red bins only
🥫 Rinse containers before recycling to prevent contamination
💡 Keep hazardous items (batteries, electronics) separate
🚿 Clean sorting area regularly to prevent pest attraction
👶 Keep children away from waste sorting areas

Stay safe while saving the planet!`,
    ar: `إرشادات الصحة والسلامة للتدوير:

🧤 ارتدِ القفازات دائماً عند التعامل مع النفايات
🧼 اغسل يديك جيداً بالصابون بعد فرز النفايات
⚠️ تعامل مع النفايات الطبية (الكمامات، الحقن) بحذر شديد - استخدم الصناديق الحمراء فقط
🥫 اشطف الحاويات قبل التدوير لمنع التلوث
💡 احتفظ بالمواد الخطرة (البطاريات، الإلكترونيات) منفصلة
🚿 نظف منطقة الفرز بانتظام لمنع جذب الحشرات
👶 أبعد الأطفال عن مناطق فرز النفايات

ابقَ آمناً أثناء إنقاذ الكوكب!`,
  },
  plastic: {
    keywords: ["plastic", "bottle", "بلاستيك", "زجاجة", "قارورة"],
    en: `♻️ Plastic Recycling Facts:

⏰ Plastic takes 450 YEARS to decompose naturally!
🌊 8 million tons of plastic enter oceans each year
💡 Recycling one plastic bottle saves enough energy to power a light bulb for 3 hours

At FERZA RECYCLE:
• Place plastic in YELLOW bins
• Remove caps separately
• Rinse containers before recycling
• Earn 15 points per plastic bottle!

Your single bottle makes a difference!`,
    ar: `♻️ حقائق تدوير البلاستيك:

⏰ يستغرق البلاستيك 450 سنة للتحلل طبيعياً!
🌊 8 مليون طن من البلاستيك تدخل المحيطات سنوياً
💡 تدوير زجاجة بلاستيكية واحدة يوفر طاقة كافية لتشغيل مصباح لمدة 3 ساعات

في فرزة للتدوير:
• ضع البلاستيك في الصناديق الصفراء
• أزل الأغطية بشكل منفصل
• اشطف الحاويات قبل التدوير
• اكسب 15 نقطة لكل زجاجة بلاستيكية!

زجاجتك الواحدة تصنع فرقاً!`,
  },
  points: {
    keywords: ["points", "earn", "reward", "نقاط", "اكسب", "مكافآت", "كم"],
    en: `🎯 FERZA Points System:

EARN POINTS:
• Plastic bottles: 15 points each
• Paper/Cardboard: 10 points per kg
• Glass containers: 20 points each
• Organic waste: 8 points per kg
• Metal cans: 12 points each
• E-waste: 50 points per item

REDEEM POINTS:
• 500 pts = Phone credit (100 DZD)
• 1000 pts = Grocery voucher (200 DZD)
• 2500 pts = Restaurant voucher (500 DZD)
• 5000 pts = Cash withdrawal (1000 DZD)

Start recycling today and watch your points grow!`,
    ar: `🎯 نظام نقاط فرزة:

اكسب نقاط:
• الزجاجات البلاستيكية: 15 نقطة لكل واحدة
• الورق/الكرتون: 10 نقاط للكيلو
• الحاويات الزجاجية: 20 نقطة لكل واحدة
• النفايات العضوية: 8 نقاط للكيلو
• العلب المعدنية: 12 نقطة لكل واحدة
• النفايات الإلكترونية: 50 نقطة للقطعة

استبدل نقاطك:
• 500 نقطة = رصيد هاتف (100 دج)
• 1000 نقطة = قسيمة بقالة (200 دج)
• 2500 نقطة = قسيمة مطعم (500 دج)
• 5000 نقطة = سحب نقدي (1000 دج)

ابدأ التدوير اليوم وشاهد نقاطك تنمو!`,
  },
  tips: {
    keywords: ["tip", "tips", "advice", "how", "نصيحة", "نصائح", "كيف"],
    en: `🌱 Eco-Recycling Tips:

DECOMPOSITION TIMES:
• Paper: 2-6 weeks
• Orange peel: 6 months
• Milk carton: 5 years
• Plastic bag: 20 years
• Plastic bottle: 450 years
• Glass bottle: 1 million years!

QUICK TIPS:
✅ Flatten cardboard boxes to save space
✅ Remove food residue before recycling
✅ Check recycling symbols on packaging
✅ Separate different material types
✅ Reuse items when possible before recycling

Every small action counts!`,
    ar: `🌱 نصائح التدوير البيئي:

أوقات التحلل:
• الورق: 2-6 أسابيع
• قشر البرتقال: 6 أشهر
• علبة الحليب: 5 سنوات
• كيس البلاستيك: 20 سنة
• زجاجة البلاستيك: 450 سنة
• زجاجة الزجاج: مليون سنة!

نصائح سريعة:
✅ اضغط علب الكرتون لتوفير المساحة
✅ أزل بقايا الطعام قبل التدوير
✅ تحقق من رموز التدوير على العبوات
✅ افصل أنواع المواد المختلفة
✅ أعد استخدام الأشياء قبل تدويرها

كل عمل صغير يُحدث فرقاً!`,
  },
  default: {
    keywords: [],
    en: "I'm your FERZA AI Eco-Assistant! 🌿 I can help you with:\n\n• 📜 Algerian recycling laws (ask about 'law')\n• 🛡️ Safety guidelines (ask about 'safety')\n• ♻️ Recycling tips (ask about 'plastic', 'tips')\n• 🎯 Points system (ask about 'points')\n\nHow can I help you recycle better today?",
    ar: "أنا مساعدك البيئي الذكي من فرزة! 🌿 يمكنني مساعدتك في:\n\n• 📜 قوانين التدوير الجزائرية (اسأل عن 'قانون')\n• 🛡️ إرشادات السلامة (اسأل عن 'سلامة')\n• ♻️ نصائح التدوير (اسأل عن 'بلاستيك'، 'نصائح')\n• 🎯 نظام النقاط (اسأل عن 'نقاط')\n\nكيف يمكنني مساعدتك في التدوير اليوم؟",
  },
}

export function AiAssistant() {
  const { t, language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: knowledgeBase.default[language || "en"],
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    // Check each knowledge base entry for keyword matches
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (key === "default") continue
      if (data.keywords.some((keyword) => lowerQuery.includes(keyword))) {
        return data[language || "en"]
      }
    }

    return knowledgeBase.default[language || "en"]
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getResponse(userMessage.content),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="border-0 shadow-lg rounded-[20px] h-[500px] flex flex-col card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary nav-icon-hover" />
          {t("aiAssistant")}
          <Sparkles className="w-4 h-4 text-yellow-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-4 pt-0">
        <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    message.role === "user" ? "bg-primary" : "bg-secondary"
                  }`}
                  style={message.role === "user" ? { backgroundColor: "#1d9944" } : {}}
                >
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.role === "user" ? "text-white rounded-tr-none" : "bg-secondary rounded-tl-none"
                  }`}
                  style={message.role === "user" ? { backgroundColor: "#1d9944" } : {}}
                >
                  <p className="text-sm whitespace-pre-line">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary animate-pulse" />
                </div>
                <div className="bg-secondary p-3 rounded-2xl rounded-tl-none">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full ai-thinking-dot" style={{ backgroundColor: "#1d9944" }} />
                      <span className="w-2 h-2 rounded-full ai-thinking-dot" style={{ backgroundColor: "#1d9944" }} />
                      <span className="w-2 h-2 rounded-full ai-thinking-dot" style={{ backgroundColor: "#1d9944" }} />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {language === "ar" ? "الذكاء الاصطناعي يفكر..." : "AI is thinking..."}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2 mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t("askQuestion")}
            className="rounded-xl"
          />
          <Button
            onClick={handleSend}
            size="icon"
            className="rounded-xl shrink-0 btn-ferza"
            disabled={!input.trim() || isTyping}
          >
            <Send className="w-4 h-4 text-white" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
