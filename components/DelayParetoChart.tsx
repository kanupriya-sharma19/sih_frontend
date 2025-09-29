// components/DelayParetoChart.tsx

"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// 1. Define the data structure and sample data
interface DelayData {
  reason: string;
  count: number;
}

const rawDelayData: DelayData[] = [
  { reason: "Signal Failure", count: 85 },
  { reason: "Track Maintenance", count: 62 },
  { reason: "Congestion", count: 45 },
  { reason: "Crew Unavailable", count: 25 },
  { reason: "Loco Failure", count: 15 },
  { reason: "Weather", count: 8 },
  { reason: "Other", count: 5 },
];

// 2. Process the data for the Pareto chart
const processParetoData = (data: DelayData[]) => {
  const sortedData = [...data].sort((a, b) => b.count - a.count);
  const totalCount = sortedData.reduce((sum, item) => sum + item.count, 0);
  let cumulativeCount = 0;

  return sortedData.map((item) => {
    cumulativeCount += item.count;
    return {
      ...item,
      cumulative: parseFloat(((cumulativeCount / totalCount) * 100).toFixed(1)),
    };
  });
};

const chartData = processParetoData(rawDelayData);

export function DelayParetoChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analysis of Delay Reasons</CardTitle>
        <CardDescription>
          Identifying the most frequent causes of train delays (80/20 Rule).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            data={chartData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="reason" angle={-15} textAnchor="end" height={60} />

            {/* Primary Y-axis for the bar counts */}
            <YAxis
              yAxisId="left"
              orientation="left"
              stroke="#4F46E5"
              label={{
                value: "Number of Incidents",
                angle: -90,
                 dx: -22, 
                position: "center", // vertically centered
              }}
            />

            {/* Secondary Y-axis for the cumulative percentage line */}
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#4F46E5"
              domain={[0, 100]}
              tickFormatter={(tick) => `${tick}%`}
              label={{
                value: "Cumulative Percentage",
                angle: -90,
                position: "center", // centers the label vertically
                dx: 35, // adjust horizontal distance from axis
              }}
            />

            <Tooltip
              formatter={(value, name) =>
                name === "Cumulative" ? `${value}%` : value
              }
            />
            <Legend />

            <Bar
              dataKey="count"
              yAxisId="left"
              name="Incidents"
              fill="#FFA500"
            />
            <Line
              type="monotone"
              dataKey="cumulative"
              yAxisId="right"
              name="Cumulative"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
