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
  { hour: "6 AM", CSMT: 1200, Dadar: 980, Thane: 1100, Santacruz: 900, Andheri: 1000 },
  { hour: "9 AM", CSMT: 2400, Dadar: 2000, Thane: 2200, Santacruz: 1800, Andheri: 2100 },
  { hour: "12 PM", CSMT: 1600, Dadar: 1500, Thane: 1700, Santacruz: 1400, Andheri: 1550 },
  { hour: "3 PM", CSMT: 1800, Dadar: 1600, Thane: 1750, Santacruz: 1500, Andheri: 1650 },
  { hour: "6 PM", CSMT: 3000, Dadar: 2800, Thane: 2900, Santacruz: 2500, Andheri: 2700 },
  { hour: "9 PM", CSMT: 1400, Dadar: 1200, Thane: 1300, Santacruz: 1000, Andheri: 1150 },
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
                <Line type="monotone" dataKey="CSMT" stroke="#2563eb" />
                <Line type="monotone" dataKey="Dadar" stroke="#16a34a" />
                <Line type="monotone" dataKey="Thane" stroke="#9333ea" />
                <Line type="monotone" dataKey="Santacruz" stroke="#f59e0b" />
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
