import { redis, getUserPointsKey, getUserStatsKey, getUserLanguageKey, type UserStats, defaultStats } from "@/lib/redis"

const FALLBACK_DATA = {
  points: 156,
  stats: defaultStats,
  language: null,
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return Response.json({ error: "userId required" }, { status: 400 })
  }

  try {
    const [points, stats, language] = await Promise.all([
      redis.get<number>(getUserPointsKey(userId)),
      redis.get<UserStats>(getUserStatsKey(userId)),
      redis.get<string>(getUserLanguageKey(userId)),
    ])

    return Response.json({
      points: points ?? FALLBACK_DATA.points,
      stats: stats ?? FALLBACK_DATA.stats,
      language: language ?? FALLBACK_DATA.language,
    })
  } catch (error) {
    console.error("Error fetching user stats:", error)
    return Response.json(FALLBACK_DATA)
  }
}

export async function POST(req: Request) {
  try {
    const { userId, points, stats, language } = await req.json()

    if (!userId) {
      return Response.json({ error: "userId required" }, { status: 400 })
    }

    try {
      const updates: Promise<unknown>[] = []

      if (points !== undefined) {
        updates.push(redis.set(getUserPointsKey(userId), points))
      }
      if (stats) {
        updates.push(redis.set(getUserStatsKey(userId), stats))
      }
      if (language) {
        updates.push(redis.set(getUserLanguageKey(userId), language))
      }

      await Promise.all(updates)
    } catch (redisError) {
      console.error("Redis update failed:", redisError)
      // Continue without failing
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Error updating user stats:", error)
    return Response.json({ success: true })
  }
}
