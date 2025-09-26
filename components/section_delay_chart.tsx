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
    { station: "CSMT", delay: 12 },
    { station: "Dadar", delay: 8 },
    { station: "Thane", delay: 10 },
    { station: "Santacruz", delay: 15 },
    { station: "Andheri", delay: 11 },
  ],
  "CSMT": [
    { hour: "6 AM", delay: 12 },
    { hour: "9 AM", delay: 18 },
    { hour: "12 PM", delay: 10 },
  ],
  "Dadar": [
    { hour: "6 AM", delay: 8 },
    { hour: "9 AM", delay: 12 },
    { hour: "12 PM", delay: 9 },
  ],
  "Thane": [
    { hour: "6 AM", delay: 10 },
    { hour: "9 AM", delay: 14 },
    { hour: "12 PM", delay: 11 },
  ],
  "Santacruz": [
    { hour: "6 AM", delay: 15 },
    { hour: "9 AM", delay: 20 },
    { hour: "12 PM", delay: 12 },
  ],
  "Andheri": [
    { hour: "6 AM", delay: 11 },
    { hour: "9 AM", delay: 13 },
    { hour: "12 PM", delay: 10 },
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
