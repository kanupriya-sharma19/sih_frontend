"use client"

import Image from "next/image"
import { RailwayAlert } from "@/components/railway_alert"
import { RailwayHeader } from "@/components/railway-header"
import { MetricCard } from "@/components/metric-card"
import { PassengerFlowChart } from "@/components/passenger-flow-chart"
import { HourlyDelayChart } from "@/components/hourly"
import {PeakHoursChart} from "@/components/bagraph_rush"
import { PlatformOccupancy } from "@/components/platform-occupancy"
import { RealTimeAlerts } from "@/components/real-time-alerts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Clock, Train, MapPin, AlertTriangle } from "lucide-react"

export default function RailwayDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <RailwayHeader />

      {/* Background alert section */}
      <div className="relative h-52 w-full overflow-hidden">
        <Image
          src="/images/person 1.png" // place image inside /public
          alt="Control Panel"
          fill
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-black/50" />

        {/* Centered Alert */}
        <div className="absolute inset-0 flex items-center justify-center">
          <RailwayAlert
            message="Power Outage affecting Santacruz Station"
            time="8:00am"
          />
        </div>
      </div>

      {/* Main Dashboard Section */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Dashboard Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-balance">Passenger Impact Dashboard</h1>
            <p className="text-muted-foreground">Real-time railway operations monitoring</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">CSMT</Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <MetricCard
            title="Section Passengers"
            value="8432"
            subtitle="2.5% from yesterday"
            icon={Users}
            iconColor="text-blue-500"
          />
          <MetricCard title="Average Section Delay" value="12.1 min" icon={Clock} iconColor="text-orange-500" />
          <MetricCard title="Active Trains" value="67" icon={Train} iconColor="text-green-500" />
          <MetricCard title="Critical Delays" value="2" icon={AlertTriangle} iconColor="text-red-500" />
          <MetricCard title="Total Stations" value="10" icon={MapPin} iconColor="text-purple-500" />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* <PassengerFlowChart /> */}
          <HourlyDelayChart />
          <PeakHoursChart/>
        </div>

        {/* Platform and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PlatformOccupancy />
          </div>
          <RealTimeAlerts />
        </div>

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
  )
}
