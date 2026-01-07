"use client"

import useSWR from "swr"
import { useUser } from "@/contexts/user-context"
import type { UserStats } from "@/lib/redis"

const FALLBACK_STATS: UserStats = {
  treesSaved: 12,
  waterConserved: 2450,
  co2Reduced: 48.5,
  totalScans: 24,
  lastScanDate: null,
  lastScanImageUrl: null,
  lastScanResult: null,
}

const FALLBACK_POINTS = 156

const safeFetcher = async (url: string) => {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error("Failed to fetch")
    const data = await res.json()
    return data
  } catch (error) {
    console.error("[v0] Stats fetch failed, using fallback:", error)
    return {
      points: FALLBACK_POINTS,
      stats: FALLBACK_STATS,
      language: null,
    }
  }
}

export interface UserStatsData {
  points: number
  stats: UserStats
  language: string | null
}

export function useUserStats() {
  const { user } = useUser()
  const userId = user?.id || "demo-user"

  const { data, error, isLoading, mutate } = useSWR<UserStatsData>(`/api/user-stats?userId=${userId}`, safeFetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true,
    fallbackData: {
      points: FALLBACK_POINTS,
      stats: FALLBACK_STATS,
      language: null,
    },
    onError: (err) => {
      console.error("[v0] SWR error:", err)
    },
  })

  const updateStats = async (updates: Partial<{ points: number; stats: Partial<UserStats>; language: string }>) => {
    try {
      await fetch("/api/user-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ...updates }),
      })
      mutate()
    } catch (error) {
      console.error("[v0] Failed to update stats:", error)
    }
  }

  return {
    points: data?.points ?? FALLBACK_POINTS,
    stats: data?.stats ?? FALLBACK_STATS,
    savedLanguage: data?.language,
    isLoading,
    error,
    updateStats,
    mutate,
  }
}
