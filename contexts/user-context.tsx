"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  role: "customer" | "shop_owner"
  points?: number
  state?: string
  municipality?: string
  nif?: string
  nic?: string
  accessibilityMode?: boolean
}

interface UserContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  logout: () => void
  toggleAccessibilityMode: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const isAuthenticated = user !== null

  const logout = () => setUser(null)

  const toggleAccessibilityMode = () => {
    if (user) {
      setUser({
        ...user,
        accessibilityMode: !user.accessibilityMode,
      })
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, logout, toggleAccessibilityMode }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
