export interface GitHubFile {
  name: string
  path: string
  sha: string
  size: number
  type: "file" | "dir"
  content?: string
}

export interface GitHubCommit {
  sha: string
  message: string
  author: {
    name: string
    email: string
    date: string
  }
}

export class GitHubService {
  private token: string
  private owner: string
  private repo: string

  constructor(token: string, owner: string, repo: string) {
    this.token = token
    this.owner = owner
    this.repo = repo
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `https://api.github.com/repos/${this.owner}/${this.repo}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: "application/vnd.github.v3+json",
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`GitHub API error: ${response.status} - ${error}`)
    }

    return response.json()
  }

  async getFile(path: string): Promise<GitHubFile | null> {
    try {
      return await this.request<GitHubFile>(`/contents/${path}`)
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        return null
      }
      throw error
    }
  }

  async getDirectory(path: string = ""): Promise<GitHubFile[]> {
    return await this.request<GitHubFile[]>(`/contents/${path}`)
  }

  async createFile(
    path: string,
    content: string,
    message: string
  ): Promise<void> {
    const contentEncoded = Buffer.from(content).toString("base64")
    await this.request(`/contents/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: contentEncoded,
      }),
    })
  }

  async updateFile(
    path: string,
    content: string,
    message: string,
    sha: string
  ): Promise<void> {
    const contentEncoded = Buffer.from(content).toString("base64")
    await this.request(`/contents/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: contentEncoded,
        sha,
      }),
    })
  }

  async deleteFile(path: string, message: string, sha: string): Promise<void> {
    await this.request(`/contents/${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sha,
      }),
    })
  }

  async uploadImage(
    path: string,
    content: Buffer,
    message: string
  ): Promise<void> {
    const contentEncoded = content.toString("base64")
    await this.request(`/contents/${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        content: contentEncoded,
      }),
    })
  }

  async getCommits(limit: number = 10): Promise<GitHubCommit[]> {
    return await this.request<GitHubCommit[]>(`/commits?per_page=${limit}`)
  }
}
