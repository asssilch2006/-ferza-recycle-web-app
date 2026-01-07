import { Redis } from "@upstash/redis"

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})

// User stats keys
export const getUserPointsKey = (userId: string) => `user:${userId}:points`
export const getUserStatsKey = (userId: string) => `user:${userId}:stats`
export const getUserLanguageKey = (userId: string) => `user:${userId}:language`
export const getUserScansKey = (userId: string) => `user:${userId}:scans`

// Default stats structure
export interface UserStats {
  treesSaved: number
  waterConserved: number
  co2Reduced: number
  totalScans: number
  lastScanDate: string | null
  lastScanImageUrl: string | null
  lastScanResult: string | null
}

export const defaultStats: UserStats = {
  treesSaved: 12,
  waterConserved: 2450,
  co2Reduced: 48.5,
  totalScans: 24,
  lastScanDate: null,
  lastScanImageUrl: null,
  lastScanResult: null,
}
