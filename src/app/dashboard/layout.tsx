import { redirect } from "next/navigation";
import { SidebarProvider } from "~/components/ui/sidebar";
import { SkillDriftSidebar } from "~/components/skilldrift-sidebar";
import { auth } from "~/server/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <SkillDriftSidebar user={session.user} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </SidebarProvider>
  );
}
