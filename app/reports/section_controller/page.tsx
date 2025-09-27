"use client"

import Image from "next/image"
import { useState } from "react"
import { RailwayHeader } from "@/components/railway-header"
import { RailwayAlert } from "@/components/railway_alert"
import { MetricCard } from "@/components/metric-card"
import { SectionPassengerChart } from "@/components/section_passenger_chart"
import { SectionDelayChart } from "@/components/section_delay_chart"
import { PlatformOccupancy } from "@/components/platform-occupancy"
import { RealTimeAlerts } from "@/components/real-time-alerts"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, Clock, Train, MapPin, AlertTriangle } from "lucide-react"
import { RollingStockForm } from "@/components/rolling_stock_form"
import {TrainScheduleChart} from "@/components/section"
import { RailwayAlertCarousel, Alert } from "@/components/carousel"


export default function RailwayDashboard() {
  const [selectedStation, setSelectedStation] = useState("All Stations")
  const alertsPage1: Alert[] = [
  { message: "Power Outage", time: "8:00am", type: "danger", station: "Dadar" },
  { message: "Signal Failure", time: "8:30am", type: "danger", station: "CSMT" },
]



  return (
    <div className="min-h-screen bg-background">
      <RailwayHeader />
          <RailwayAlertCarousel alerts={alertsPage1}/>
      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-6 space-y-6">
       {/* Title, Add Train Button & Station Dropdown */}
<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
  <div>
    <h1 className="text-3xl font-bold">Section Controller Dashboard</h1>
    <p className="text-muted-foreground">Monitor all stations in your section</p>
  </div>

          {/* Right-side controls */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Add Train Button + Rolling Stock Modal */}
            <RollingStockForm />

            {/* Station Selector Dropdown */}
              <select
              value={selectedStation}
              onChange={(e) => setSelectedStation(e.target.value)}
              className="
      border-2 border-purple-600 rounded-lg px-4 py-2
      text-black font-medium
      focus:outline-none focus:ring-2 focus:ring-purple-600
      bg-white hover:bg-purple-50 transition
    "
            >
              <option value="All Stations">All Stations</option>
              <option value="MMCT">MMCT</option>
              <option value="Borivali">Borivali</option>
              <option value="Bandra">Bandra</option>
              <option value="Dadar">Dadar</option>
              <option value="Andheri">Andheri</option>
            </select>
          </div>
        </div>

      {/* Key Metrics */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
  <MetricCard
    title="Section Passengers"
    value="3.24 million"
    subtitle="↑ 3.2% from yesterday"
    icon={Users}
    iconColor="text-blue-500"
  />
  <MetricCard
    title="Avg Section Delay"
    value="19 min"
    subtitle="↓ 1.5 min vs last week"
    icon={Clock}
    iconColor="text-orange-500"
  />
  <MetricCard
    title="Active Trains"
    value="2,342"
    subtitle="↑ 5 from yesterday"
    icon={Train}
    iconColor="text-green-500"
  />
  <MetricCard
    title="Critical Delays"
    value="60"
    subtitle="2 more than average"
    icon={AlertTriangle}
    iconColor="text-red-500"
  />
  <MetricCard
    title="Total Stations"
    value="29"
    subtitle="Fixed across network"
    icon={MapPin}
    iconColor="text-purple-500"
  />
</div>


        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionPassengerChart selectedStation={selectedStation} />
          <SectionDelayChart selectedStation={selectedStation} />
        </div>

        {/* Platform Occupancy + Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PlatformOccupancy />
          </div>
          <RealTimeAlerts />
        </div>
      </main>
      <TrainScheduleChart/>
    </div>
  )
}
