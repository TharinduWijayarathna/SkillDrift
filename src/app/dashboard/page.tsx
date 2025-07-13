import { Suspense } from "react";
import { 
  SidebarTrigger, 
  SidebarInset 
} from "~/components/ui/sidebar";
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { 
  BookOpen, 
  Trophy, 
  Users, 
  TrendingUp, 
  Clock, 
  Target,
  Plus,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

import { auth } from "~/server/auth";
import { LatestPost } from "~/app/_components/post";

export default async function DashboardPage() {
  const session = await auth();

  // Mock data for demonstration
  const stats = [
    {
      title: "Courses Completed",
      value: "12",
      change: "+2 this month",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Achievements",
      value: "24",
      change: "+3 new",
      icon: Trophy,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Study Streak",
      value: "15 days",
      change: "Personal best!",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Study Time",
      value: "47h",
      change: "+8h this week",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: "Completed React Fundamentals",
      type: "Course",
      time: "2 hours ago",
      badge: "Completed",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      title: "Earned JavaScript Expert Badge",
      type: "Achievement",
      time: "1 day ago",
      badge: "New Badge",
      badgeColor: "bg-yellow-100 text-yellow-800",
    },
    {
      id: 3,
      title: "Joined Advanced TypeScript Study Group",
      type: "Community",
      time: "2 days ago",
      badge: "Joined",
      badgeColor: "bg-blue-100 text-blue-800",
    },
    {
      id: 4,
      title: "Started Node.js Backend Development",
      type: "Course",
      time: "3 days ago",
      badge: "In Progress",
      badgeColor: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="#">SkillDrift</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="mx-auto w-full max-w-7xl">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {session?.user?.name ?? "Learner"}! 👋
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s an overview of your learning journey and progress.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.change}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Continue your learning journey
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" asChild>
                  <Link href="/dashboard/learning">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Courses
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/dashboard/community">
                    <Users className="mr-2 h-4 w-4" />
                    Join Study Groups
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link href="/dashboard/achievements">
                    <Trophy className="mr-2 h-4 w-4" />
                    View Achievements
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest learning milestones
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="flex items-center gap-3">
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {activity.type} • {activity.time}
                      </p>
                    </div>
                    <Badge className={activity.badgeColor}>
                      {activity.badge}
                    </Badge>
                  </div>
                ))}
                <Button variant="ghost" className="w-full justify-start text-sm" asChild>
                  <Link href="/dashboard/activity">
                    View all activity
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Posts Section */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Posts</CardTitle>
                <CardDescription>
                  Share your progress and insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div className="text-sm text-muted-foreground">Loading posts...</div>}>
                  <LatestPost />
                </Suspense>
              </CardContent>
            </Card>
          </div>

          {/* Learning Progress Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>
                Pick up where you left off
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">React Advanced Patterns</h3>
                    <p className="text-sm text-muted-foreground">Progress: 65%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">TypeScript Mastery</h3>
                    <p className="text-sm text-muted-foreground">Progress: 45%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">Node.js Backend</h3>
                    <p className="text-sm text-muted-foreground">Progress: 20%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: "20%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
