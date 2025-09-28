"use client";

import Image from "next/image";
import {
  Users,
  Clock,
  Train,
  AlertTriangle,
  MapPin,
  Ticket,
  Activity,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { RailwayAlert } from "@/components/railway_alert";
import { RailwayHeader } from "@/components/railway-header";
import { DelayDistributionChart } from "@/components/pie";
import { MetricCard } from "@/components/metric-card";
import { PitLineChart } from "@/components/pit_line";
import { BotsPlatformChart } from "@/components/bots_platform";
import { PassengerFlowChart } from "@/components/passenger-flow-chart";
import { HourlyDelayChart } from "@/components/hourly";
import { PeakHoursChart } from "@/components/bagraph_rush";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RailwayAlertCarousel, Alert } from "@/components/carousel";
import { PlatformOccupancy } from "@/components/platform-occupancy";
import { ChatBot } from "@/components/chat";
import { PlatformOccupancyChart } from "@/components/PlatformOccupancyChart";
import { useRouter } from "next/navigation";
import {RealTimeAlerts} from "@/components/real-time-alerts"

type AlertItem = { type: "warning" | "info" | "success"; message: string; time: string };

const page1Alerts: AlertItem[] = [
  { type: "warning", message: "Local Train 501 Borivali–Churchgate delayed by 10 mins due to signal checks", time: "2 mins ago" },
  { type: "warning", message: "Local Train 709 Dadar–Bandra Junction halted near Bandra due to track inspection", time: "5 mins ago" },
  { type: "success", message: "All suburban services running on time in Western Railways zone", time: "3 mins ago" },
  { type: "warning", message: "Local Train 601 Churchgate–Bandra slow due to high passenger load", time: "7 mins ago" },
  { type: "info", message: "Maintenance scheduled at Andheri Station foot overbridge from 18:00–20:00", time: "15 mins ago" },
];


const alertsPage1: Alert[] = [
  {
    message: "Train 709 halted near Bandra due to track inspection",
    time: "3:30pm",
    type: "danger",
    station: "Andheri",
  },
  {
    message: "Maintenance scheduled at Andheri Station foot overbridge from 18:00–20:00",
    time: "3:00pm",
    type: "info",
    station: "Andheri",
  },
  {
    message: "Local Train 501 Borivali–Churchgate delayed by 10 mins due to signal checks",
    time: "2 mins ago",
    type: "warning",
    station: "Andheri",
  },
  {
    message: "Local Train 709 Dadar–Bandra Junction halted near Bandra due to track inspection",
    time: "5 mins ago",
    type: "warning",
    station: "Andheri",
  },
  {
    message: "All suburban services running on time in Western Railways zone",
    time: "3 mins ago",
    type: "success",
    station: "Andheri",
  },
  {
    message: "Local Train 601 Churchgate–Bandra slow due to high passenger load",
    time: "7 mins ago",
    type: "warning",
    station: "Andheri",
  },
  {
    message: "Maintenance scheduled at Andheri Station foot overbridge from 18:00–20:00",
    time: "15 mins ago",
    type: "info",
    station: "Andheri",
  },
];

export default function RailwayDashboard() {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-background">
      <RailwayHeader />
      <ChatBot />
      <RailwayAlertCarousel alerts={alertsPage1} />
      {/* Main Dashboard Section */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Dashboard Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">
              Andheri Passenger Impact Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time railway operations monitoring
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              suppressHydrationWarning
              onClick={() => handleNavigation("http://localhost:3001/")}
              className="bg-purple-700 hover:bg-purple-500 text-white font-semibold px-6 py-2 rounded shadow-md transition w-full"
            >
              Andheri Live Time Table
            </Button>

            <Button
              suppressHydrationWarning
              onClick={() =>
                handleNavigation("http://localhost:3001/analytics")
              }
              className="bg-purple-700 hover:bg-purple-500 text-white font-semibold px-6 py-2 rounded shadow-md transition w-full"
            >
              Andheri Live Analytics
            </Button>
          </div>
        </div>

        {/* Rest of your dashboard content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Top row: Passenger & Punctuality */}
          <MetricCard
            title="Daily Passengers"
            value="1.5M"
            subtitle={
              <span className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" /> +2.5% vs yesterday
              </span>
            }
            icon={Users}
            iconColor="text-blue-500"
          />
          <MetricCard
            title="Average Delay"
            value="5.2 min"
            subtitle={
              <span className="flex items-center text-red-600">
                <TrendingDown className="w-4 h-4 mr-1" /> -0.8 min vs yesterday
              </span>
            }
            icon={Clock}
            iconColor="text-orange-500"
          />
          <MetricCard
            title="On-Time Performance"
            value="94%"
            subtitle={
              <span className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" /> +1.5% vs last week
              </span>
            }
            icon={Clock}
            iconColor="text-emerald-500"
          />
          <MetricCard
            title="Incidents Reported"
            value="2"
            subtitle={
              <span className="flex items-center text-red-600">
                <TrendingUp className="w-4 h-4 mr-1" /> +1 vs daily avg
              </span>
            }
            icon={AlertTriangle}
            iconColor="text-rose-500"
          />

          {/* Bottom row: Center-aligned 3 cards with proper sizing */}
          <div className="col-span-full flex justify-center gap-4">
            <div className="w-full md:w-1/2 lg:w-1/4">
              <MetricCard
                title="Critical Delays"
                value="2"
                subtitle={
                  <span className="flex items-center text-red-600">
                    <TrendingDown className="w-4 h-4 mr-1" /> -1 vs yesterday
                  </span>
                }
                icon={AlertTriangle}
                iconColor="text-red-500"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <MetricCard
                title="Platforms"
                value="9"
                subtitle="All operational"
                icon={MapPin}
                iconColor="text-purple-500"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-1/4">
              <MetricCard
                title="Track Utilization"
                value="85%"
                subtitle={
                  <span className="flex items-center text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" /> +2% vs last month
                  </span>
                }
                icon={Activity}
                iconColor="text-teal-500"
              />
            </div>
          </div>
        </div>

        {/* Charts Grid */}
                        <RealTimeAlerts alerts={page1Alerts} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PassengerFlowChart />
          <HourlyDelayChart />
          <PeakHoursChart />
          <DelayDistributionChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <PassengerFlowChart /> */}
        </div>
        
        <PitLineChart />
        <PlatformOccupancyChart />
      </main>
    </div>
  );
}
