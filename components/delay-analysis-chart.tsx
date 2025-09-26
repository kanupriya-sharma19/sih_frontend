"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts"

const delayData = [
  { time: "00:00", avgDelay: 18, weatherDelay: 2 },
  { time: "04:00", avgDelay: 16, weatherDelay: 1 },
  { time: "08:00", avgDelay: 19, weatherDelay: 7 },
  { time: "12:00", avgDelay: 28, weatherDelay: 3 },
  { time: "16:00", avgDelay: 26, weatherDelay: 5 },
  { time: "20:00", avgDelay: 22, weatherDelay: 3 },
]

export function DelayAnalysisChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Impact on Delays</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            avgDelay: {
              label: "Average Delay (mins)",
              color: "var(--chart-1)", // use var()
            },
            weatherDelay: {
              label: "Weather Delay (mins)",
              color: "var(--chart-2)", // use var()
            },
          }}
          className="h-[320px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={delayData}>
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />

              {/* Lines */}
              <Line
                type="monotone"
                dataKey="avgDelay"
                stroke="var(--chart-1)" // fixed
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Average Delay"
              />
              <Line
                type="monotone"
                dataKey="weatherDelay"
                stroke="var(--chart-2)" // fixed
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Weather Delay"
              />

              {/* Legend */}
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
