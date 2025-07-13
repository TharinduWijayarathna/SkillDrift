import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import DashboardClient from "./_components/dashboard-client";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return <DashboardClient session={session} />;
}
