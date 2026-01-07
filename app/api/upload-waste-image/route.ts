import { put } from "@vercel/blob"

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as File
    const userId = formData.get("userId") as string

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 })
    }

    const blob = await put(`waste-images/${userId || "anonymous"}/${Date.now()}-${file.name}`, file, {
      access: "public",
    })

    return Response.json({
      success: true,
      url: blob.url,
      filename: file.name,
      size: file.size,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return Response.json({ error: "Upload failed" }, { status: 500 })
  }
}
