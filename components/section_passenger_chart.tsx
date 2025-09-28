"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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

interface SectionPassengerChartProps {
  selectedStation: string
}

const dataAll = [
  { hour: "6 AM", MMCT: 120000, Borivali: 98000, Bandra: 110000, Dadar: 90000, Andheri: 100000 },
  { hour: "9 AM", MMCT: 240000, Borivali: 200000, Bandra: 220000, Dadar: 180000, Andheri: 210000 },
  { hour: "12 PM", MMCT: 160000, Borivali: 150000, Bandra: 170000, Dadar: 140000, Andheri: 155000 },
  { hour: "3 PM", MMCT: 180000, Borivali: 160000, Bandra: 175000, Dadar: 150000, Andheri: 165000 },
  { hour: "6 PM", MMCT: 300000, Borivali: 280000, Bandra: 290000, Dadar: 250000, Andheri: 270000 },
  { hour: "9 PM", MMCT: 140000, Borivali: 120000, Bandra: 130000, Dadar: 100000, Andheri: 115000 },
]

export function SectionPassengerChart({ selectedStation }: SectionPassengerChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {selectedStation === "All Stations" ? "Passenger Flow Across All Stations" : `Passenger Flow at ${selectedStation}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dataAll}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectedStation === "All Stations" ? (
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
