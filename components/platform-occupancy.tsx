"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Rectangle,
  RectangleProps,
} from "recharts";

// Train type
type Train = { start: number; end: number; type: string; color: string; value: number };

// Platform data type
type PlatformData = { platform: string; trains: Train[] };

// Extended platform data with multiple platforms
const platformData: PlatformData[] = [
  {
    platform: "Platform 1",
    trains: [
      { start: 4, end: 6, type: "Freight", color: "#86EFAC", value: 45000 },
      { start: 8, end: 10, type: "Passenger", color: "#60A5FA", value: 72000 },
      { start: 12, end: 14, type: "Express", color: "#FBBF24", value: 68000 },
      { start: 16, end: 18, type: "Passenger", color: "#60A5FA", value: 89000 },
      { start: 20, end: 22, type: "Freight", color: "#86EFAC", value: 38000 },
    ],
  },
  {
    platform: "Platform 2",
    trains: [
      { start: 5, end: 7, type: "Express", color: "#FBBF24", value: 55000 },
      { start: 9, end: 11, type: "Passenger", color: "#60A5FA", value: 81000 },
      { start: 13, end: 15, type: "Freight", color: "#86EFAC", value: 47000 },
      { start: 17, end: 19, type: "Special", color: "#F87171", value: 92000 },
      { start: 21, end: 23, type: "Passenger", color: "#60A5FA", value: 61000 },
    ],
  },
  {
    platform: "Platform 3",
    trains: [
      { start: 6, end: 8, type: "Passenger", color: "#60A5FA", value: 78000 },
      { start: 10, end: 12, type: "Freight", color: "#86EFAC", value: 42000 },
      { start: 14, end: 16, type: "Express", color: "#FBBF24", value: 85000 },
      { start: 18, end: 20, type: "Special", color: "#F87171", value: 95000 },
    ],
  },
  {
    platform: "Platform 4",
    trains: [
      { start: 6, end: 8, type: "Passenger", color: "#60A5FA", value: 86223 },
      { start: 6, end: 8, type: "Freight", color: "#86EFAC", value: 50647 },
      { start: 14, end: 16, type: "Express", color: "#FACC15", value: 81449 },
      { start: 20, end: 22, type: "Freight", color: "#86EFAC", value: 16697 },
    ],
  },
  {
    platform: "Platform 5",
    trains: [
      { start: 6, end: 8, type: "Express", color: "#FBBF24", value: 38056 },
      { start: 6, end: 8, type: "Freight", color: "#86EFAC", value: 80636 },
      { start: 14, end: 16, type: "Passenger", color: "#60A5FA", value: 96687 },
      { start: 16, end: 18, type: "Freight", color: "#86EFAC", value: 43449 },
    ],
  },
  {
    platform: "Platform 6",
    trains: [
      { start: 7, end: 9, type: "Special", color: "#F87171", value: 72000 },
      { start: 11, end: 13, type: "Passenger", color: "#60A5FA", value: 88000 },
      { start: 15, end: 17, type: "Freight", color: "#86EFAC", value: 39000 },
      { start: 19, end: 21, type: "Express", color: "#FBBF24", value: 67000 },
    ],
  },
  {
    platform: "Platform 7",
    trains: [
      { start: 4, end: 6, type: "Freight", color: "#86EFAC", value: 35000 },
      { start: 8, end: 10, type: "Special", color: "#F87171", value: 91000 },
      { start: 12, end: 14, type: "Passenger", color: "#60A5FA", value: 74000 },
      { start: 16, end: 18, type: "Express", color: "#FBBF24", value: 82000 },
      { start: 20, end: 22, type: "Passenger", color: "#60A5FA", value: 58000 },
    ],
  },
  {
    platform: "Platform 8",
    trains: [
      { start: 5, end: 7, type: "Passenger", color: "#60A5FA", value: 69000 },
      { start: 9, end: 11, type: "Express", color: "#FBBF24", value: 76000 },
      { start: 13, end: 15, type: "Special", color: "#F87171", value: 88000 },
      { start: 17, end: 19, type: "Freight", color: "#86EFAC", value: 41000 },
      { start: 21, end: 23, type: "Express", color: "#FBBF24", value: 72000 },
    ],
  },
];

// Props for the custom bar shape
interface OccupancyBarShapeProps extends RectangleProps {
  platform: string;
  trains: Train[];
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

// Custom shape for multiple trains per platform
function OccupancyBarShape({ x = 0, y = 0, width = 0, height = 0, trains }: OccupancyBarShapeProps) {
  const trainCount = trains.length;

  return (
    <>
      {trains.map((train, i) => {
        const barX = x + ((train.start - 4) / 20) * width; // Adjusted for 4-24 hour range
        const barWidth = ((train.end - train.start) / 20) * width;
        const barHeight = Math.max(height / trainCount, 8); // Minimum height for visibility

        return (
          <Rectangle
            key={i}
            x={barX}
            y={y + i * barHeight}
            width={barWidth}
            height={barHeight - 1}
            fill={train.color}
            stroke="#333"
            strokeWidth={0.5}
            rx={1}
          />
        );
      })}
    </>
  );
}

// Custom tooltip props
interface CustomTooltipProps {
  active?: boolean;
  payload?: { payload: PlatformData }[];
}

// Custom Tooltip component
function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload || !payload.length) return null;
  
  const platformData = payload[0].payload;
  if (!platformData?.trains) return null;

  return (
    <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg max-w-xs">
      <p className="font-bold text-gray-800 mb-2 text-sm">{platformData.platform}</p>
      <div className="space-y-1">
        {platformData.trains.map((train: Train, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: train.color }}
            />
            <span className="font-medium">{train.type}:</span>
            <span>{train.start}:00 - {train.end}:00</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Transform data for better visualization
const transformedData = platformData.map(platform => ({
  ...platform,
  barValue: platform.trains.reduce((acc, train) => acc + train.value, 0) / platform.trains.length
}));

// Generate time labels for X-axis
const timeLabels = Array.from({ length: 21 }, (_, i) => i + 4); // 4 to 24 hours
const timeTicks = [4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24];

// Main chart component
export function PlatformOccupancy() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Platform Occupancy Dashboard - Railway Station</CardTitle>
        <p className="text-sm text-gray-600">Showing occupancy for 8 platforms throughout the day</p>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={500}>
          <BarChart
            data={transformedData}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 120, bottom: 40 }}
            barSize={50}
          >
            <XAxis 
              type="number" 
              domain={[4, 24]}
              ticks={timeTicks}
              tickFormatter={(value) => `${value}:00`}
              label={{ 
                value: "Time (24-Hour Format)", 
                position: "insideBottom", 
                offset: -10,
                style: { fontSize: 12, fontWeight: 'bold' }
              }}
            />
            <YAxis 
              type="category" 
              dataKey="platform" 
              width={100}
              tick={{ fontSize: 12, fontWeight: 'bold' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="barValue"
              fill="transparent"
              shape={(props: any) => (
                <OccupancyBarShape 
                  x={props.x} 
                  y={props.y} 
                  width={props.width} 
                  height={props.height} 
                  platform={props.payload.platform}
                  trains={props.payload.trains}
                />
              )}
            />
            
            {/* Add background grid for better time reference */}
            {timeTicks.map((tick) => (
              <line
                key={tick}
                x1={tick}
                x2={tick}
                y1={0}
                y2="100%"
                stroke="#e5e7eb"
                strokeWidth={1}
                strokeDasharray="3 3"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="mt-6 flex gap-6 text-sm flex-wrap justify-center">
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-yellow-400" /> Express
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-blue-400" /> Passenger
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-green-400" /> Freight
          </span>
          <span className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-red-400" /> Special
          </span>
        </div>

        {/* Statistics */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-xs text-gray-600">
          <div className="bg-gray-50 p-2 rounded">
            <div className="font-semibold">Total Platforms</div>
            <div>{platformData.length}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="font-semibold">Total Trains</div>
            <div>{platformData.reduce((acc, platform) => acc + platform.trains.length, 0)}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="font-semibold">Peak Hours</div>
            <div>6:00-10:00, 16:00-20:00</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="font-semibold">Operating Hours</div>
            <div>4:00-24:00</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}