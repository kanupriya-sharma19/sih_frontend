"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
} from "recharts"

const delayDistribution = [
  { name: "0-5 min", value: 4800 },
  { name: "5-15 min", value: 2340 },
  { name: "15-30 min", value: 980 },
  { name: "30+ min", value: 420 },
]

const COLORS = [
  "var(--chart-1)", // green
  "var(--chart-2)", // yellow
  "var(--chart-3)", // red
  "var(--chart-4)", // dark red
]

export function DelayDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Delay Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Number of Trains",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={delayDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ value }) => `${value}`}
              >
                {delayDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Custom Legend */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
          {delayDistribution.map((entry, index) => (
            <div key={entry.name} className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-sm"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              <span>{entry.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
