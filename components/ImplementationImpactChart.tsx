// components/ImplementationImpactChart.tsx

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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ReferenceArea,
  CartesianGrid,
} from "recharts";

// 1. Define the data structure and the "Go-Live" date for the AI
interface PerformanceData {
  date: string;
  onTimePercentage: number;
}

const IMPLEMENTATION_DATE = "2025-09-01";
const TODAY_DATE = "2025-09-28"; // Current date

// 2. Generate realistic sample data showing a clear "before and after" effect
const generateImpactData = (): PerformanceData[] => {
  const data: PerformanceData[] = [];
  const startDate = new Date("2025-06-01");

  for (let i = 0; i < 180; i++) {
    // Generate 6 months of data
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split("T")[0];

    let basePerformance: number;
    let fluctuation: number;

    if (currentDate < new Date(IMPLEMENTATION_DATE)) {
      basePerformance = 88;
      fluctuation = (Math.random() - 0.5) * 5;
    } else {
      const daysSinceLaunch =
        (currentDate.getTime() - new Date(IMPLEMENTATION_DATE).getTime()) /
        (1000 * 3600 * 24);
      const gradualImprovement = Math.min(daysSinceLaunch / 15, 1) * 6;
      basePerformance = 88 + gradualImprovement;
      fluctuation = (Math.random() - 0.5) * 2;
    }

    data.push({
      date: dateStr,
      onTimePercentage: parseFloat((basePerformance + fluctuation).toFixed(1)),
    });
  }
  return data;
};

const chartData = generateImpactData();

// Calculate the performance improvement
const calculateImprovement = () => {
  const beforeData = chartData.filter(
    (item) => item.date < IMPLEMENTATION_DATE
  );
  const afterData = chartData.filter(
    (item) => item.date >= IMPLEMENTATION_DATE && item.date <= TODAY_DATE
  );

  const avgBefore =
    beforeData.reduce((sum, item) => sum + item.onTimePercentage, 0) /
    beforeData.length;
  const avgAfter =
    afterData.reduce((sum, item) => sum + item.onTimePercentage, 0) /
    afterData.length;

  return {
    avgBefore: parseFloat(avgBefore.toFixed(1)),
    avgAfter: parseFloat(avgAfter.toFixed(1)),
    improvement: parseFloat((avgAfter - avgBefore).toFixed(1)),
  };
};

export function ImplementationImpactChart() {
  const { avgBefore, avgAfter, improvement } = calculateImprovement();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col gap-2">
          <span>On-Time Performance Impact Analysis</span>
        </CardTitle>
        <CardDescription>
          Predicted tracking daily performance before and after the
          implementation of Drishti.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Before/After Labels above the chart - Properly centered */}
        <div className="relative w-full h-12 mb-2">
          {/* Before label - centered over left half */}
          <div className="absolute left-0 top-0 w-1/2 flex justify-center">
            <span className="text-sm font-bold text-black bg-green-50 px-3 py-1 rounded-lg border border-green-200">
              Before Implementation
            </span>
          </div>

          {/* After label - centered over right half */}
          <div className="absolute right-0 top-0 w-1/2 flex justify-center">
            <span className="text-sm font-bold text-black bg-green-50 px-3 py-1 rounded-lg border border-green-200">
              After Implementation
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="date"
              tickFormatter={(dateStr) => {
                const date = new Date(dateStr);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  year: "2-digit",
                });
              }}
              label={{
                value: "Date",
                position: "insideBottom",
                offset: -15,
                style: {
                  fill: "#000000",
                  fontWeight: "bold",
                  textAnchor: "middle",
                },
              }}
            />

            <YAxis
              domain={[80, 100]}
              tickFormatter={(tick) => `${tick}%`}
              label={{
                value: "On-Time Performance",
                angle: -90,
                position: "insideLeft",
                style: {
                  fill: "#000000",
                  fontWeight: "bold",
                  textAnchor: "middle",
                },
              }}
            />

            <Tooltip
              labelFormatter={(label) =>
                new Date(label).toLocaleDateString("en-GB")
              }
              formatter={(value: number) => [`${value.toFixed(1)}%`, "On-Time"]}
            />

            {/* Vertical Implementation Line - Adjusted thickness */}
            <ReferenceLine
              x={IMPLEMENTATION_DATE}
              stroke="#DC2626"
              strokeWidth={3}
              strokeDasharray="5 5"
              label={{
                value: "GO-LIVE",
                position: "top",
                fill: "#DC2626",
                fontSize: 14,
                fontWeight: "bold",
                stroke: "white",
                strokeWidth: 2,
                paintOrder: "stroke",
              }}
            />

            {/* Today's date marker - Adjusted thickness */}
            <ReferenceLine
              x={TODAY_DATE}
              stroke="#8B5CF6"
              strokeWidth={3}
              strokeDasharray="5 5"
              label={{
                value: "TODAY",
                position: "top",
                fill: "#8B5CF6",
                fontSize: 14,
                fontWeight: "bold",
                stroke: "white",
                strokeWidth: 2,
                paintOrder: "stroke",
              }}
            />

            {/* BEFORE region */}
            <ReferenceArea
              x1={chartData[0].date}
              x2={
                new Date(
                  new Date(IMPLEMENTATION_DATE).getTime() - 24 * 3600 * 1000
                )
                  .toISOString()
                  .split("T")[0]
              }
              fill="rgba(16,185,129,0.1)"
            />

            {/* AFTER region */}
            <ReferenceArea
              x1={
                new Date(
                  new Date(IMPLEMENTATION_DATE).getTime() + 24 * 3600 * 1000
                )
                  .toISOString()
                  .split("T")[0]
              }
              x2={chartData[chartData.length - 1].date}
              fill="rgba(16,185,129,0.05)"
            />

            <Area
              type="monotone"
              dataKey="onTimePercentage"
              stroke="#10B981"
              strokeWidth={2}
              fill="url(#colorPerformance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}