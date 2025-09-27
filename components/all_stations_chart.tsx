"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface AllStationsChartProps {
  selectedStation: string
}

const data = [
  { hour: "6 AM", MMCT: 1200, Borivali: 980, Bandra: 1100, Dadar: 900, Andheri: 1000 },
  { hour: "9 AM", MMCT: 2400, Borivali: 2000, Bandra: 2200, Dadar: 1800, Andheri: 2100 },
  { hour: "12 PM", MMCT: 1600, Borivali: 1500, Bandra: 1700, Dadar: 1400, Andheri: 1550 },
  { hour: "3 PM", MMCT: 1800, Borivali: 1600, Bandra: 1750, Dadar: 1500, Andheri: 1650 },
  { hour: "6 PM", MMCT: 3000, Borivali: 2800, Bandra: 2900, Dadar: 2500, Andheri: 2700 },
  { hour: "9 PM", MMCT: 1400, Borivali: 1200, Bandra: 1300, Dadar: 1000, Andheri: 1150 },
]

export function AllStationsChart({ selectedStation }: AllStationsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedStation === "all" ? "Passenger Flow Across All Stations" : `Passenger Flow at ${selectedStation}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedStation === "all" ? (
              <>
                <Line type="monotone" dataKey="MMCT" stroke="#2563eb" />
                <Line type="monotone" dataKey="Borivali" stroke="#16a34a" />
                <Line type="monotone" dataKey="Bandra" stroke="#9333ea" />
                <Line type="monotone" dataKey="Dadar" stroke="#f59e0b" />
                <Line type="monotone" dataKey="Andheri" stroke="#ef4444" />
              </>
            ) : (
              <Line type="monotone" dataKey={selectedStation} stroke="#2563eb" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
