"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { useUser } from "@/contexts/user-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Store, ArrowLeft } from "lucide-react"

type Role = "customer" | "shop_owner" | null
type AuthMode = "login" | "signup"

const algerianStates = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Algiers",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
]

export function AuthScreen() {
  const { t } = useLanguage()
  const { setUser } = useUser()
  const [role, setRole] = useState<Role>(null)
  const [authMode, setAuthMode] = useState<AuthMode>("login")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dob: "",
    nationalId: "",
    state: "",
    municipality: "",
    nif: "",
    nic: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate authentication
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name || "Demo User",
      email: formData.email,
      role: role!,
      points: 1250,
      state: formData.state,
      municipality: formData.municipality,
      nif: formData.nif,
      nic: formData.nic,
    })
  }

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center gap-2">
            <div className="relative w-24 h-24 pulse-glow rounded-full">
              <img
                src="/images/green-20-20-20white-20simple-20recycle-20logo-20-281-29.png"
                alt="Ferza Recycle Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-center -mt-1">
              <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#1d9944" }}>
                FERZA
              </h1>
              <p className="text-lg font-bold tracking-[0.2em]" style={{ color: "#1d9944" }}>
                RECYCLE
              </p>
            </div>
          </div>

          <Card className="border-0 shadow-lg rounded-[20px] card-hover">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-xl">{t("selectRole")}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <Button
                onClick={() => setRole("customer")}
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={
                  {
                    "--tw-shadow-color": "rgba(29, 153, 68, 0.3)",
                  } as React.CSSProperties
                }
              >
                <User className="w-8 h-8 nav-icon-hover" />
                <span className="text-lg font-medium">{t("customer")}</span>
              </Button>
              <Button
                onClick={() => setRole("shop_owner")}
                variant="outline"
                className="w-full h-20 flex flex-col gap-2 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <Store className="w-8 h-8 nav-icon-hover" />
                <span className="text-lg font-medium">{t("shopOwner")}</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <Button variant="ghost" onClick={() => setRole(null)} className="flex items-center gap-2 sidebar-btn-hover">
          <ArrowLeft className="w-4 h-4" />
          {t("back")}
        </Button>

        <div className="flex flex-col items-center gap-2">
          <div className="relative w-16 h-16">
            <img
              src="/images/green-20-20-20white-20simple-20recycle-20logo-20-281-29.png"
              alt="Ferza Recycle Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-muted-foreground">{role === "customer" ? t("customer") : t("shopOwner")}</p>
        </div>

        <Card className="border-0 shadow-lg rounded-[20px] card-hover">
          <CardContent className="p-6">
            <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as AuthMode)}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">{t("login")}</TabsTrigger>
                <TabsTrigger value="signup">{t("signup")}</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <TabsContent value="login" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")}</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">{t("password")}</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4 mt-0">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t("name")}</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">{t("email")}</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">{t("password")}</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">{t("dob")}</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nationalId">{t("nationalId")}</Label>
                    <Input
                      id="nationalId"
                      value={formData.nationalId}
                      onChange={(e) => setFormData({ ...formData, nationalId: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">{t("state")}</Label>
                    <Select
                      value={formData.state}
                      onValueChange={(value) => setFormData({ ...formData, state: value })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {algerianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="municipality">{t("municipality")}</Label>
                    <Input
                      id="municipality"
                      value={formData.municipality}
                      onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                      className="rounded-xl"
                      required
                    />
                  </div>

                  {role === "shop_owner" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="nif">{t("nif")}</Label>
                        <Input
                          id="nif"
                          value={formData.nif}
                          onChange={(e) => setFormData({ ...formData, nif: e.target.value })}
                          className="rounded-xl"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="nic">{t("nic")}</Label>
                        <Input
                          id="nic"
                          value={formData.nic}
                          onChange={(e) => setFormData({ ...formData, nic: e.target.value })}
                          className="rounded-xl"
                          required
                        />
                      </div>
                    </>
                  )}
                </TabsContent>

                <Button type="submit" className="w-full h-12 rounded-xl text-lg font-semibold btn-ferza text-white">
                  {authMode === "login" ? t("login") : t("signup")}
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
