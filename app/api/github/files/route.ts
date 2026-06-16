import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"

export async function GET(request: NextRequest) {
  const session = await auth()
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path") || ""

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  try {
    const file = await github.getFile(path)
    return NextResponse.json(file)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch file" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const { path, content, message } = body

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  try {
    const existingFile = await github.getFile(path)
    
    if (existingFile) {
      await github.updateFile(path, content, message, existingFile.sha)
    } else {
      await github.createFile(path, content, message)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save file" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth()
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const path = searchParams.get("path")
  const message = searchParams.get("message") || "Delete file"

  if (!path) {
    return NextResponse.json({ error: "Path is required" }, { status: 400 })
  }

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  try {
    const file = await github.getFile(path)
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    await github.deleteFile(path, message, file.sha)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete file" },
      { status: 500 }
    )
  }
}
