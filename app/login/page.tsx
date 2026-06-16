import { signIn } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Github } from "lucide-react"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
          <p className="text-muted-foreground">
            Sign in with GitHub to access the admin panel
          </p>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server"
              await signIn("github", { redirectTo: "/admin" })
            }}
          >
            <Button type="submit" className="w-full" size="lg">
              <Github className="w-5 h-5 mr-2" />
              Sign in with GitHub
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
