"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Users,
  Clock,
  Train,
  AlertTriangle,
  MapPin,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import { RailwayHeader } from "@/components/railway-header";
import { RailwayAlert } from "@/components/railway_alert";
import { MetricCard } from "@/components/metric-card";
import { SectionPassengerChart } from "@/components/section_passenger_chart";
import { SectionDelayChart } from "@/components/section_delay_chart";
import { PlatformOccupancy } from "@/components/platform-occupancy";
import { RealTimeAlerts } from "@/components/real-time-alerts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RollingStockForm } from "@/components/rolling_stock_form";
import { TrainScheduleChart } from "@/components/section";
import { RailwayAlertCarousel, Alert } from "@/components/carousel";
import { ChatBot } from "@/components/chat";
import { PlatformOccupancyChart } from "@/components/PlatformOccupancyChart";
import { TrainChart } from "@/components/TrainChart";
type AlertItem = { type: "warning" | "info" | "success"; message: string; time: string };

const page1Alerts: AlertItem[] = [
  { type: "warning", message: "Local Train 501 Borivali–Churchgate delayed by 10 mins due to signal checks", time: "2 mins ago" },
  { type: "warning", message: "Local Train 709 Dadar–Bandra Junction halted near Bandra due to track inspection", time: "5 mins ago" },
  { type: "warning", message: "Local Train 601 Churchgate–Bandra slow due to high passenger load", time: "7 mins ago" },
  { type: "info", message: "Maintenance scheduled at Dadar Station foot overbridge from 13:00–15:00", time: "15 mins ago" },
];


export default function RailwayDashboard() {
  const [selectedStation, setSelectedStation] = useState("All Stations");
  const alertsPage1: Alert[] = [
    {
      message: "Maintenance scheduled at Dadar Station foot overbridge",
      time: "13:00pm",
      type: "info",
      station: "Dadar",
    },
    {
      message: "Signal Failure",
      time: "8:30am",
      type: "danger",
      station: "CSMT",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <RailwayHeader />
      <ChatBot />
      <RailwayAlertCarousel alerts={alertsPage1} />
      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Title, Add Train Button & Station Dropdown */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Section Controller Dashboard</h1>
            <p className="text-muted-foreground">
              Monitor all stations in your section
            </p>
          </div>

          {/* Right-side controls */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Add Train Button + Rolling Stock Modal */}
            <RollingStockForm />
            <select
            suppressHydrationWarning
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
          {/* Top row - 5 cards */}
          <MetricCard
            title="Section Passengers"
            value="3.24 million"
            subtitle={
              <span className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" /> 3.2% from yesterday
              </span>
            }
            icon={Users}
            iconColor="text-blue-500"
          />
          <MetricCard
            title="Avg Section Delay"
            value="19 min"
            subtitle={
              <span className="flex items-center text-red-600">
                <TrendingDown className="w-4 h-4 mr-1" /> 1.5 min less than
                yesterday
              </span>
            }
            icon={Clock}
            iconColor="text-orange-500"
          />
          <MetricCard
            title="Active Trains"
            value="2,342"
            subtitle={
              <span className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" /> 5 more than yesterday
              </span>
            }
            icon={Train}
            iconColor="text-green-500"
          />
          <MetricCard
            title="Critical Delays"
            value="60"
            subtitle={
              <span className="flex items-center text-red-600">
                <TrendingUp className="w-4 h-4 mr-1" /> 2 above daily avg
              </span>
            }
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

          {/* 🔹 Center-aligned bottom row - Using grid columns */}
          <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
            <div className="w-full max-w-xs">
              <MetricCard
                title="Track Utilization"
                value="87%"
                subtitle={
                  <span className="flex items-center text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" /> +2.5% from last
                    month
                  </span>
                }
                icon={Activity}
                iconColor="text-teal-500"
              />
            </div>
            <div className="w-full max-w-xs">
              <MetricCard
                title="Throughput"
                value="210 million ton-km"
                subtitle={
                  <span className="flex items-center text-green-600">
                    <TrendingUp className="w-4 h-4 mr-1" /> +4.1% vs last
                    quarter
                  </span>
                }
                icon={TrendingUp}
                iconColor="text-indigo-500"
              />
            </div>
            <div className="w-full max-w-xs">
              <MetricCard
                title="Incidents Reported"
                value="9"
                subtitle={
                  <span className="flex items-center text-red-600">
                    <TrendingUp className="w-4 h-4 mr-1" /> 1 above weekly avg
                  </span>
                }
                icon={AlertTriangle}
                iconColor="text-rose-500"
              />
            </div>
          </div>
        </div>
        <RealTimeAlerts alerts={page1Alerts} />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionPassengerChart selectedStation={selectedStation} />
          <SectionDelayChart selectedStation={selectedStation} />
        </div>
        {/* Platform Occupancy + Alerts */}
        <PlatformOccupancyChart />
      </main>
      <TrainScheduleChart />
    </div>
  );
}
