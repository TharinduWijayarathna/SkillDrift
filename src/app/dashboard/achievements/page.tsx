import { SidebarTrigger, SidebarInset } from "~/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Trophy, Award, Star, Target } from "lucide-react";

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first course",
      icon: Target,
      earned: true,
      earnedDate: "2024-01-15",
      points: 100,
    },
    {
      id: 2,
      title: "JavaScript Expert",
      description: "Master JavaScript fundamentals",
      icon: Star,
      earned: true,
      earnedDate: "2024-02-20",
      points: 250,
    },
    {
      id: 3,
      title: "Study Streak",
      description: "Study for 7 consecutive days",
      icon: Award,
      earned: true,
      earnedDate: "2024-03-01",
      points: 150,
    },
    {
      id: 4,
      title: "Community Helper",
      description: "Help 10 fellow learners",
      icon: Trophy,
      earned: false,
      earnedDate: null,
      points: 300,
      progress: 7,
      total: 10,
    },
    {
      id: 5,
      title: "React Master",
      description: "Complete the React learning path",
      icon: Star,
      earned: false,
      earnedDate: null,
      points: 500,
      progress: 3,
      total: 5,
    },
  ];

  const totalPoints = achievements
    .filter((a) => a.earned)
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem>
              <BreadcrumbPage>Achievements</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
            <p className="text-muted-foreground">
              Track your progress and celebrate your learning milestones
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Points
                </CardTitle>
                <Trophy className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalPoints}</div>
                <p className="text-muted-foreground text-xs">
                  Earned from {achievements.filter((a) => a.earned).length}{" "}
                  achievements
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Achievements
                </CardTitle>
                <Award className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {achievements.filter((a) => a.earned).length}/
                  {achievements.length}
                </div>
                <p className="text-muted-foreground text-xs">
                  {Math.round(
                    (achievements.filter((a) => a.earned).length /
                      achievements.length) *
                      100,
                  )}
                  % complete
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rank</CardTitle>
                <Star className="text-muted-foreground h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Gold</div>
                <p className="text-muted-foreground text-xs">
                  Top 15% of learners
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Achievements Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={
                  achievement.earned ? "border-green-200 bg-green-50/50" : ""
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div
                      className={`rounded-lg p-2 ${achievement.earned ? "bg-green-100" : "bg-gray-100"}`}
                    >
                      <achievement.icon
                        className={`h-6 w-6 ${achievement.earned ? "text-green-600" : "text-gray-400"}`}
                      />
                    </div>
                    {achievement.earned ? (
                      <Badge className="bg-green-100 text-green-800">
                        Earned
                      </Badge>
                    ) : (
                      <Badge variant="outline">Locked</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{achievement.title}</CardTitle>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {achievement.points} points
                    </span>
                    {achievement.earned ? (
                      <span className="text-muted-foreground text-xs">
                        Earned{" "}
                        {new Date(achievement.earnedDate!).toLocaleDateString()}
                      </span>
                    ) : achievement.progress ? (
                      <span className="text-muted-foreground text-xs">
                        {achievement.progress}/{achievement.total} progress
                      </span>
                    ) : null}
                  </div>
                  {!achievement.earned &&
                    achievement.progress &&
                    achievement.total && (
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-gray-200">
                          <div
                            className="h-2 rounded-full bg-blue-600"
                            style={{
                              width: `${(achievement.progress / achievement.total) * 100}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
