"use client";

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
import { useState } from "react";
import {TrainChart} from "@/components/new";
import { TrainScheduleChart } from "@/components/section";
import { RailwayHeader } from "@/components/railway-header";
import { MetricCard } from "@/components/metric-card";
import { SectionPassengerChart } from "@/components/section_passenger_chart";
import { SectionDelayChart } from "@/components/section_delay_chart";
import { PlatformOccupancyChart } from "@/components/PlatformOccupancyChart";
import { RealTimeAlerts } from "@/components/real-time-alerts";
import { UserForm } from "@/components/add_new_user";
import { RailwayAlertCarousel, Alert } from "@/components/carousel";
import { ChatBot } from "@/components/chat";

type AlertItem = {
  type: "warning" | "info" | "success";
  message: string;
  time: string;
};
const page1Alerts: AlertItem[] = [
  {
    type: "warning",
    message: "Train 19015 Mumbai Central–Ahmedabad Express delayed by 25 mins",
    time: "5 mins ago",
  },
  {
    type: "warning",
    message:
      "Train 12957 Bandra Terminus–Gandhinagar Express halted near Borivali due to signal checks",
    time: "10 mins ago",
  },
    {
    type: "success",
    message: "All signal systems operational in Western Railways zone",
    time: "3 mins ago",
  },
  {
    type: "warning",
    message:
      "Local Train 501 Borivali–Churchgate delayed by 8 mins near Andheri",
    time: "3 mins ago",
  },


];

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
  const [selectedStation, setSelectedStation] = useState("All Stations");

  return (
    <div className="min-h-screen bg-background">
      <RailwayHeader />
      <ChatBot />

      {/* Top alerts carousel */}
      <RailwayAlertCarousel alerts={alertsPage1} />

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Title & Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Admin</h1>
            <p className="text-muted-foreground">
              Monitor all stations in your section
            </p>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <UserForm />
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

          {/* Bottom row cards */}
          <div className="col-span-full grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
            <MetricCard
              title="Track Utilization"
              value="87%"
              subtitle={
                <span className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" /> +2.5% from last month
                </span>
              }
              icon={Activity}
              iconColor="text-teal-500"
            />
            <MetricCard
              title="Throughput"
              value="210 million ton-km"
              subtitle={
                <span className="flex items-center text-green-600">
                  <TrendingUp className="w-4 h-4 mr-1" /> +4.1% vs last quarter
                </span>
              }
              icon={TrendingUp}
              iconColor="text-indigo-500"
            />
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

        {/* Charts */}
                <RealTimeAlerts alerts={page1Alerts} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionPassengerChart selectedStation={selectedStation} />
          <SectionDelayChart selectedStation={selectedStation} />
        </div>

        {/* Platform Occupancy + Alerts */}
        <PlatformOccupancyChart />

        {/* Train Schedule */}
        <TrainScheduleChart />
        <TrainChart/>
      </main>
    </div>
  );
}
