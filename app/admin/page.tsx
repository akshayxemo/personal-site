import { auth } from "@/lib/auth"
import { GitHubService } from "@/lib/github"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  FolderKanban, 
  FileText, 
  Award, 
  GitCommit,
  Clock,
  TrendingUp
} from "lucide-react"

export default async function AdminOverviewPage() {
  const session = await auth()
  
  if (!session?.accessToken) {
    return null
  }

  const github = new GitHubService(
    session.accessToken,
    process.env.GITHUB_OWNER!,
    process.env.GITHUB_REPO!
  )

  const [projects, articles, commits] = await Promise.all([
    github.getDirectory("content/projects").catch(() => []),
    github.getDirectory("content/articles").catch(() => []),
    github.getCommits(5).catch(() => []),
  ])

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderKanban,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Articles",
      value: articles.length,
      icon: FileText,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Certifications",
      value: 6,
      icon: Award,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Recent Commits",
      value: commits.length,
      icon: GitCommit,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCommit className="w-5 h-5" />
              Recent Commits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {commits.slice(0, 5).map((commit) => (
                <div key={commit.sha} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium line-clamp-1">
                      {commit.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {commit.author.name} • {new Date(commit.author.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {commits.length === 0 && (
                <p className="text-sm text-muted-foreground">No recent commits</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/projects/new"
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-accent transition-colors"
            >
              <span className="text-sm font-medium">Create New Project</span>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </a>
            <a
              href="/admin/articles/new"
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-accent transition-colors"
            >
              <span className="text-sm font-medium">Write New Article</span>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </a>
            <a
              href="/admin/media"
              className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-accent transition-colors"
            >
              <span className="text-sm font-medium">Upload Media</span>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
