'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getItem } from '../utils/localStorage';
import { calculateDietPlan } from '../utils/calculations';
import { User, UserInfo, DietPlan } from '../types';
import { 
  ArrowLeft, 
  Scale, 
  Target, 
  Timer, 
  Utensils, 
  Activity, 
  User as UserIcon,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CustomXAxis = (props: any) => <XAxis {...props} />;
const CustomYAxis = (props: any) => <YAxis {...props} />;

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);

  useEffect(() => {
    const userData = getItem('user');
    const userInfoData = getItem('userInfo');

    if (!userData || !userInfoData) {
      router.push('/login');
      return;
    }

    setUser(userData);
    setUserInfo(userInfoData);
    setDietPlan(calculateDietPlan(userInfoData));
  }, [router]);

  if (!user || !userInfo || !dietPlan) {
    return null;
  }

  const progressPercentage = Math.min(
    100,
    Math.abs((userInfo.weight - userInfo.targetWeight) / 
    (userInfo.weight - userInfo.targetWeight)) * 100
  );

  const generateWeightData = () => {
    const data = [];
    const weeklyChange = dietPlan.weeklyWeightChange;
    const weeks = dietPlan.timeToGoal;
    let currentWeight = userInfo.weight;

    for (let i = 0; i <= weeks; i++) {
      data.push({
        week: `Week ${i}`,
        weight: Number(currentWeight.toFixed(1))
      });
      currentWeight += weeklyChange;
    }
    return data;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleEditInfo = () => {
    router.push('/info');
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center bg-card p-6 rounded-lg shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <UserIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">Track your progress and stay motivated</p>
            </div>
          </div>
          <div className="space-x-4">
            <Button variant="outline" onClick={handleEditInfo}>
              Edit Information
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>Your journey from {userInfo.weight}kg to {userInfo.targetWeight}kg</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={generateWeightData()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <CustomXAxis dataKey="week" />
                  <CustomYAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <CardTitle>Personal Information</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Height</p>
                  <p className="text-2xl font-semibold">{userInfo.height}<span className="text-lg text-muted-foreground"> cm</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Weight</p>
                  <p className="text-2xl font-semibold">{userInfo.weight}<span className="text-lg text-muted-foreground"> kg</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Age</p>
                  <p className="text-2xl font-semibold">{userInfo.age}<span className="text-lg text-muted-foreground"> years</span></p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Gender</p>
                  <p className="text-2xl font-semibold capitalize">{userInfo.gender}</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Activity Level</p>
                  <p className="text-2xl font-semibold capitalize">{userInfo.activityLevel.replace('-', ' ')}</p>
                </div>
                <div className="col-span-2 space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">Goal</p>
                  <p className="text-2xl font-semibold capitalize">{userInfo.goal} weight</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Diet Plan */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>Diet Plan</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <div className="flex items-center gap-4">
                    <Utensils className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Daily Calories</p>
                      <p className="text-2xl font-semibold">{dietPlan.dailyCalories} <span className="text-lg text-muted-foreground">kcal</span></p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Scale className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Weekly Change</p>
                        <p className="text-xl font-semibold">{Math.abs(dietPlan.weeklyWeightChange)} <span className="text-base text-muted-foreground">kg/week</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <Timer className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Time to Goal</p>
                        <p className="text-xl font-semibold">{dietPlan.timeToGoal} <span className="text-base text-muted-foreground">weeks</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-lg font-semibold mb-4">Macronutrient Distribution</h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Protein</p>
                        <p className="text-sm text-muted-foreground">{dietPlan.protein}g</p>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Carbs</p>
                        <p className="text-sm text-muted-foreground">{dietPlan.carbs}g</p>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-sm font-medium">Fats</p>
                        <p className="text-sm text-muted-foreground">{dietPlan.fats}g</p>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}