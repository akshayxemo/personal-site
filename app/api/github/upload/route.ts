import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"

export async function POST(request: NextRequest) {
  const session = await auth()
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file") as File
  const path = formData.get("path") as string
  const message = formData.get("message") as string || `Upload ${file.name}`

  if (!file || !path) {
    return NextResponse.json({ error: "File and path are required" }, { status: 400 })
  }

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  try {
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const fullPath = `${path}/${file.name}`
    
    await github.uploadImage(fullPath, buffer, message)
    
    return NextResponse.json({ 
      success: true, 
      url: `/${fullPath}` 
    })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload file" },
      { status: 500 }
    )
  }
}
