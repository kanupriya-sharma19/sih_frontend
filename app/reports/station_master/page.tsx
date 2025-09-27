"use client";

import Image from "next/image";
import { RailwayAlert } from "@/components/railway_alert";
import { RailwayHeader } from "@/components/railway-header";
import { DelayDistributionChart } from "@/components/pie";
import { MetricCard } from "@/components/metric-card";
import { PitLineChart } from "@/components/pit_line";
import { BotsPlatformChart } from "@/components/bots_platform";
import { PassengerFlowChart } from "@/components/passenger-flow-chart";
import { HourlyDelayChart } from "@/components/hourly";
import { PeakHoursChart } from "@/components/bagraph_rush";
import { PlatformOccupancy } from "@/components/platform-occupancy";
import { RealTimeAlerts } from "@/components/real-time-alerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Clock, Train, MapPin, AlertTriangle } from "lucide-react";
import { RailwayAlertCarousel, Alert } from "@/components/carousel";

const alertsPage1: Alert[] = [

  { message: "Power Outage", time: "8:00am", type: "danger", station: "Dadar" },
  { message: "Signal Failure", time: "8:30am", type: "warning", station: "MMCT" },
]
export default function RailwayDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <RailwayHeader />
      <RailwayAlertCarousel alerts={alertsPage1} />
      {/* Main Dashboard Section */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Dashboard Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">
              MMCT Passenger Impact Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time railway operations monitoring
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">MMCT</Button>
        </div>

        {/* Key Metrics */}
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Section Passengers"
            value="92,340"
            subtitle="↑ 3.5% more than yesterday"
            icon={Users}
            iconColor="text-blue-500"
          />
          <MetricCard
            title="Average Section Delay"
            value="7.8 min"
            subtitle="↓ 1.2% less than yesterday"
            icon={Clock}
            iconColor="text-orange-500"
          />
          <MetricCard
            title="Active Trains"
            value="1,084"
            subtitle="↑ 15 trains from yesterday"
            icon={Train}
            iconColor="text-green-500"
          />
          <MetricCard
            title="Critical Delays"
            value="4"
            subtitle="2 fewer than yesterday"
            icon={AlertTriangle}
            iconColor="text-red-500"
          />
        </div>
        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <PassengerFlowChart /> */}
          <HourlyDelayChart />
          <PeakHoursChart />
          <DelayDistributionChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <PassengerFlowChart /> */}
          <PitLineChart />
          <BotsPlatformChart />
        </div>
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
