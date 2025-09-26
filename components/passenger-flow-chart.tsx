"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const passengerData = [
  { time: "06:00", passengers: 1200, capacity: 2000 },
  { time: "08:00", passengers: 1800, capacity: 2000 },
  { time: "10:00", passengers: 1400, capacity: 2000 },
  { time: "12:00", passengers: 1600, capacity: 2000 },
  { time: "14:00", passengers: 1300, capacity: 2000 },
  { time: "16:00", passengers: 1700, capacity: 2000 },
  { time: "18:00", passengers: 1900, capacity: 2000 },
  { time: "20:00", passengers: 1100, capacity: 2000 },
]

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
              color: "hsl(var(--chart-1))",
            },
            capacity: {
              label: "Station Capacity",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={passengerData}>
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="passengers" fill="var(--color-passengers)" />
              <Bar dataKey="capacity" fill="var(--color-capacity)" opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
