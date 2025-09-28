"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const delayData = [
  { time: "06:00", delay: 2 },
  { time: "08:00", delay: 7 },
  { time: "10:00", delay: 2 },
  { time: "12:00", delay: 3 },
  { time: "14:00", delay: 3 },
  { time: "16:00", delay: 3 },
  { time: "18:00", delay: 10 },
  { time: "20:00", delay: 4 },
];


export function HourlyDelayChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hourly Delay Pattern</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            delay: {
              label: "Average Delay (min)",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={delayData}>
              <XAxis dataKey="time" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="delay"
                stroke="#3b82f6" // Blue-500
                fill="#3b82f6"
                fillOpacity={0.1} // Very light shade
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
