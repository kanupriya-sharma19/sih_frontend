"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface SectionDelayChartProps {
  selectedStation: string
}

// Data for delays
const data: Record<string, any[]> = {
  "All Stations": [
    { station: "MMCT", delay: 12 },
    { station: "Borivali", delay: 8 },
    { station: "Bandra", delay: 10 },
    { station: "Dadar", delay: 18 },
    { station: "Andheri", delay: 11 },
  ],
  "MMCT": [
    { hour: "6 AM", delay: 10 },
    { hour: "9 AM", delay: 18 },
    { hour: "12 PM", delay: 9 },
    { hour: "3 PM", delay: 12 },
    { hour: "6 PM", delay: 20 },
    { hour: "9 PM", delay: 8 },
  ],
  "Borivali": [
    { hour: "6 AM", delay: 6 },
    { hour: "9 AM", delay: 12 },
    { hour: "12 PM", delay: 7 },
    { hour: "3 PM", delay: 8 },
    { hour: "6 PM", delay: 15 },
    { hour: "9 PM", delay: 5 },
  ],
  "Bandra": [
    { hour: "6 AM", delay: 8 },
    { hour: "9 AM", delay: 14 },
    { hour: "12 PM", delay: 9 },
    { hour: "3 PM", delay: 10 },
    { hour: "6 PM", delay: 18 },
    { hour: "9 PM", delay: 7 },
  ],
  "Dadar": [
    { hour: "6 AM", delay: 12 },
    { hour: "9 AM", delay: 20 },
    { hour: "12 PM", delay: 10 },
    { hour: "3 PM", delay: 14 },
    { hour: "6 PM", delay: 25 },
    { hour: "9 PM", delay: 9 },
  ],
  "Andheri": [
    { hour: "6 AM", delay: 9 },
    { hour: "9 AM", delay: 15 },
    { hour: "12 PM", delay: 8 },
    { hour: "3 PM", delay: 11 },
    { hour: "6 PM", delay: 19 },
    { hour: "9 PM", delay: 7 },
  ],
}

export function SectionDelayChart({ selectedStation }: SectionDelayChartProps) {
  // Fallback to "All Stations" if the key doesn't exist
  const chartData = data[selectedStation] ?? data["All Stations"]

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedStation === "All Stations"
            ? "Average Delay by Station"
            : `Delay for ${selectedStation}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={selectedStation === "All Stations" ? "station" : "hour"} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="delay" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
