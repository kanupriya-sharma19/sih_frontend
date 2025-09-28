// components/ImplementationImpactChart.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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

const IMPLEMENTATION_DATE = '2025-07-01';

// 2. Generate realistic sample data showing a clear "before and after" effect
const generateImpactData = (): PerformanceData[] => {
  const data: PerformanceData[] = [];
  const startDate = new Date('2025-04-01');

  for (let i = 0; i < 180; i++) { // Generate 6 months of data
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dateStr = currentDate.toISOString().split('T')[0];

    let basePerformance: number;
    let fluctuation: number;

    if (currentDate < new Date(IMPLEMENTATION_DATE)) {
      basePerformance = 88;
      fluctuation = (Math.random() - 0.5) * 5;
    } else {
      const daysSinceLaunch = (currentDate.getTime() - new Date(IMPLEMENTATION_DATE).getTime()) / (1000 * 3600 * 24);
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

export function ImplementationImpactChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>On-Time Performance Impact Analysis</CardTitle>
        <CardDescription>
          Tracking daily performance before and after the implementation of Drishti AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData} margin={{ top: 40, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorPerformance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            
            <XAxis 
              dataKey="date" 
              tickFormatter={(dateStr) => {
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
              }}
              label={{ value: 'Date', position: 'insideBottom', offset: -15 }}
            />
            
            <YAxis 
              domain={[80, 100]}
              tickFormatter={(tick) => `${tick}%`}
              label={{ value: 'On-Time Performance', angle: -90, position: 'insideLeft' }}
            />
            
            <Tooltip
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-GB')}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'On-Time']}
            />

            {/* Vertical Implementation Line */}
            <ReferenceLine 
              x={IMPLEMENTATION_DATE} 
              stroke="red" 
              strokeWidth={2}
              strokeDasharray="8 4"
              label={{
                value: "Go-Live",
                position: "top",
                fill: "red",
                fontSize: 12,
              }}
            />

           {/* BEFORE region label */}
<ReferenceArea
  x1={chartData[0].date}
  x2={IMPLEMENTATION_DATE}
  fill="transparent"
  stroke="none"
/>
<text
  x="25%"
  y={40}
  textAnchor="middle"
  fill="#555"
  fontSize={18}
  fontWeight="bold"
>
  Before
</text>

{/* AFTER region label */}
<ReferenceArea
  x1={IMPLEMENTATION_DATE}
  x2={chartData[chartData.length - 1].date}
  fill="transparent"
  stroke="none"
/>
<text
  x="75%"
  y={40}
  textAnchor="middle"
  fill="#555"
  fontSize={18}
  fontWeight="bold"
>
  After
</text>


            <Area 
              type="monotone" 
              dataKey="onTimePercentage" 
              stroke="#10B981" 
              fill="url(#colorPerformance)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
