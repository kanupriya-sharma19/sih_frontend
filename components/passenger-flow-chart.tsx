"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const passengerData = [
  { time: "06:00", passengers: 30000, capacity: 40000 },
  { time: "08:00", passengers: 45000, capacity: 50000 },
  { time: "10:00", passengers: 35000, capacity: 40000 },
  { time: "12:00", passengers: 40000, capacity: 44000 },
  { time: "14:00", passengers: 32500, capacity: 40000 },
  { time: "16:00", passengers: 42500, capacity: 50000 },
  { time: "18:00", passengers: 47500, capacity: 54000 },
  { time: "20:00", passengers: 27500, capacity: 36000 },
];


export function PassengerFlowChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Passenger Flow Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            passengers: {
              label: "Current Passengers",
              color: "#3b82f6", // blue-500
            },
            capacity: {
              label: "Station Capacity",
              color: "#60a5fa", 
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={passengerData}>
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="passengers" fill="#3b82f6" /> {/* Visible blue */}
              <Bar dataKey="capacity" fill="#93c5fd" opacity={0.6} /> {/* Lighter blue */}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
