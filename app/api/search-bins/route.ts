import { smartBinLocations } from "@/lib/upstash-search"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("q")?.toLowerCase() || ""
  const language = searchParams.get("lang") || "en"

  try {
    // Filter bins based on search query
    let results = smartBinLocations

    if (query) {
      results = smartBinLocations.filter((bin) => {
        const searchText =
          language === "ar"
            ? `${bin.nameAr} ${bin.addressAr} ${bin.neighborhood} ${bin.types.join(" ")}`
            : `${bin.name} ${bin.address} ${bin.neighborhood} ${bin.types.join(" ")}`
        return searchText.toLowerCase().includes(query)
      })
    }

    // Sort by status (available first) and fill level
    results.sort((a, b) => {
      if (a.status === "available" && b.status !== "available") return -1
      if (a.status !== "available" && b.status === "available") return 1
      return a.fillLevel - b.fillLevel
    })

    return Response.json({
      success: true,
      bins: results,
      total: results.length,
    })
  } catch (error) {
    console.error("Bin search error:", error)
    return Response.json({ error: "Search failed" }, { status: 500 })
  }
}
