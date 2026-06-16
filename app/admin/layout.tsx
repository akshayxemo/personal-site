import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  )
}
