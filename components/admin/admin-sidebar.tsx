"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  FolderKanban, 
  FileText, 
  Briefcase, 
  Award, 
  Settings, 
  Image as ImageIcon,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"

const navItems = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur-sm h-screen sticky top-0">
      <div className="p-6">
        <h1 className="text-xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Portfolio CMS | akshayxemo</p>
      </div>
      
      <nav className="px-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 px-4">
        <button
          onClick={() => signOut({ redirectTo: "/" })}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground w-full transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
