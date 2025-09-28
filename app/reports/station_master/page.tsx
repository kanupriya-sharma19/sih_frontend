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
import { RealTimeAlerts } from "@/components/real-time-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RailwayAlertCarousel, Alert } from "@/components/carousel";
import { PlatformOccupancy } from "@/components/platform-occupancy";
import {ChatBot} from "@/components/chat";

const alertsPage1: Alert[] = [
  { message: "Power Outage", time: "8:00am", type: "danger", station: "Dadar" },
  {
    message: "Signal Failure",
    time: "8:30am",
    type: "danger",
    station: "MMCT",
  },
];
export default function RailwayDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <RailwayHeader />
      <ChatBot/>
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
          <Button className="bg-purple-700 hover:bg-purple-500">Andheri</Button>
        </div>
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
        value="10"
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
        <PlatformOccupancy />
        {/* Additional Charts Section */}
        {/* <Card>
          <CardHeader>
            <CardTitle>System Performance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-green-500">98.5%</div>
                <div className="text-sm text-muted-foreground">On-time Performance</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-blue-500">156</div>
                <div className="text-sm text-muted-foreground">Trains Today</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-purple-500">24/7</div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="text-2xl font-bold text-orange-500">4.2M</div>
                <div className="text-sm text-muted-foreground">Daily Passengers</div>
              </div>
            </div>
          </CardContent>
        </Card> */}
      </main>
    </div>
  );
}
