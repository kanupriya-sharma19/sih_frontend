"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  { station: "CSMT", delay: 12 },
  { station: "Dadar", delay: 8 },
  { station: "Thane", delay: 10 },
  { station: "Santacruz", delay: 15 },
  { station: "Andheri", delay: 11 },
]

export function StationComparisonChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Average Delay by Station</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="station" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="delay" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
