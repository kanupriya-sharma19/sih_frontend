// components/PunctualityTrendChart.tsx

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

// 1. Define data structure and generate sample data for 30 days
interface PunctualityData {
  date: string;
  onTimePercentage: number;
}

const generatePunctualityData = (): PunctualityData[] => {
  const data: PunctualityData[] = [];
  const today = new Date('2025-09-28'); // Using a fixed date for consistency
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Simulate some realistic fluctuation
    const randomFactor = (Math.random() - 0.5) * 4; // Fluctuation between -2% and +2%
    const onTimePercentage = parseFloat((93.5 + randomFactor).toFixed(1));

    data.push({
      date: date.toISOString().split('T')[0], // Format as 'YYYY-MM-DD'
      onTimePercentage,
    });
  }
  return data;
};

const chartData = generatePunctualityData();
const PUNCTUALITY_TARGET = 95.0; // The performance goal

export function PunctualityTrendChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>30-Day Punctuality Trend</CardTitle>
        <CardDescription>
          Tracking the daily percentage of on-time trains against the {PUNCTUALITY_TARGET}% target.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            
            <XAxis 
              dataKey="date" 
              tickFormatter={(dateStr) => {
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />

            <YAxis 
              domain={[85, 100]} // Set a tight domain to emphasize fluctuations
              tickFormatter={(tick) => `${tick}%`}
              label={{ value: 'On-Time Percentage', angle: -90, position: 'insideLeft' }}
            />
            
            <Tooltip 
              labelFormatter={(label) => new Date(label).toLocaleDateString('en-GB')}
              formatter={(value: number) => [`${value.toFixed(1)}%`, 'Punctuality']} 
            />

            <Legend />
            
            {/* Reference line for the performance target */}
            <ReferenceLine 
              y={PUNCTUALITY_TARGET} 
              label={{ value: `Target: ${PUNCTUALITY_TARGET}%`, position: 'insideTopRight' }} 
              stroke="red" 
              strokeDasharray="3 3" 
            />

            <Line type="monotone" dataKey="onTimePercentage" name="On-Time %" stroke="#10B981" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}