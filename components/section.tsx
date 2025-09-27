"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

// Train schedule data
const trainSchedules = [
  // BL-ST Trains (Red)
  { 
    id: "BL-ST-1", 
    direction: "BL-ST", 
    color: "#ef4444",
    stations: [
      { station: "VR", time: 720 }, // 12:00
      { station: "BS", time: 735 },
      { station: "NSL", time: 750 },
      { station: "MR", time: 805 },
      { station: "DS", time: 820 },
      { station: "BO", time: 835 },
      { station: "AND", time: 850 },
      { station: "BND", time: 865 },
      { station: "DR", time: 880 },
      { station: "MCT", time: 895 },
      { station: "CHG", time: 910 }, // 15:10
    ]
  },
  { 
    id: "BL-ST-2", 
    direction: "BL-ST", 
    color: "#ef4444",
    stations: [
      { station: "VR", time: 840 }, // 14:00
      { station: "BS", time: 855 },
      { station: "NSL", time: 910 },
      { station: "MR", time: 925 },
      { station: "DS", time: 940 },
      { station: "BO", time: 955 },
      { station: "AND", time: 1010 },
      { station: "BND", time: 1025 },
      { station: "DR", time: 1040 },
      { station: "MCT", time: 1055 },
      { station: "CHG", time: 1110 }, // 18:30
    ]
  },
  { 
    id: "BL-ST-3", 
    direction: "BL-ST", 
    color: "#ef4444",
    stations: [
      { station: "VR", time: 960 }, // 16:00
      { station: "BS", time: 975 },
      { station: "NSL", time: 990 },
      { station: "MR", time: 1005 },
      { station: "DS", time: 1020 },
      { station: "BO", time: 1035 },
      { station: "AND", time: 1050 },
      { station: "BND", time: 1065 },
      { station: "DR", time: 1080 },
      { station: "MCT", time: 1095 },
      { station: "CHG", time: 1110 }, // 18:30
    ]
  },
  { 
    id: "BL-ST-4", 
    direction: "BL-ST", 
    color: "#ef4444",
    stations: [
      { station: "VR", time: 1080 }, // 18:00
      { station: "BS", time: 1095 },
      { station: "NSL", time: 1110 },
      { station: "MR", time: 1125 },
      { station: "DS", time: 1140 },
      { station: "BO", time: 1155 },
      { station: "AND", time: 1210 },
      { station: "BND", time: 1225 },
      { station: "DR", time: 1240 },
      { station: "MCT", time: 1255 },
      { station: "CHG", time: 1310 }, // 21:50
    ]
  },

  // ST-BL Trains (Blue)
  { 
    id: "ST-BL-1", 
    direction: "ST-BL", 
    color: "#3b82f6",
    stations: [
      { station: "CHG", time: 780 }, // 13:00
      { station: "MCT", time: 795 },
      { station: "DR", time: 810 },
      { station: "BND", time: 825 },
      { station: "AND", time: 840 },
      { station: "BO", time: 855 },
      { station: "DS", time: 870 },
      { station: "MR", time: 885 },
      { station: "NSL", time: 900 },
      { station: "BS", time: 915 },
      { station: "VR", time: 930 }, // 15:30
    ]
  },
  { 
    id: "ST-BL-2", 
    direction: "ST-BL", 
    color: "#3b82f6",
    stations: [
      { station: "CHG", time: 900 }, // 15:00
      { station: "MCT", time: 915 },
      { station: "DR", time: 930 },
      { station: "BND", time: 945 },
      { station: "AND", time: 960 },
      { station: "BO", time: 975 },
      { station: "DS", time: 990 },
      { station: "MR", time: 1005 },
      { station: "NSL", time: 1020 },
      { station: "BS", time: 1035 },
      { station: "VR", time: 1050 }, // 17:30
    ]
  },
  { 
    id: "ST-BL-3", 
    direction: "ST-BL", 
    color: "#3b82f6",
    stations: [
      { station: "CHG", time: 1020 }, // 17:00
      { station: "MCT", time: 1035 },
      { station: "DR", time: 1050 },
      { station: "BND", time: 1065 },
      { station: "AND", time: 1080 },
      { station: "BO", time: 1095 },
      { station: "DS", time: 1110 },
      { station: "MR", time: 1125 },
      { station: "NSL", time: 1140 },
      { station: "BS", time: 1155 },
      { station: "VR", time: 1210 }, // 20:10
    ]
  },
  { 
    id: "ST-BL-4", 
    direction: "ST-BL", 
    color: "#3b82f6",
    stations: [
      { station: "CHG", time: 1140 }, // 19:00
      { station: "MCT", time: 1155 },
      { station: "DR", time: 1210 },
      { station: "BND", time: 1225 },
      { station: "AND", time: 1240 },
      { station: "BO", time: 1255 },
      { station: "DS", time: 1270 },
      { station: "MR", time: 1285 },
      { station: "NSL", time: 1300 },
      { station: "BS", time: 1315 },
      { station: "VR", time: 1330 }, // 22:10
    ]
  },
];

// Station order and positions
const stations = [
  { code: "VR", name: "VR", position: 0 },
  { code: "BS", name: "BS", position: 1 },
  { code: "NSL", name: "NSL", position: 2 },
  { code: "MR", name: "MR", position: 3 },
  { code: "DS", name: "DS", position: 4 },
  { code: "BO", name: "BO", position: 5 },
  { code: "AND", name: "AND", position: 6 },
  { code: "BND", name: "BND", position: 7 },
  { code: "DR", name: "DR", position: 8 },
  { code: "MCT", name: "MCT", position: 9 },
  { code: "CHG", name: "CHG", position: 10 },
];

// Transform data for the chart
const chartData = stations.map(station => {
  const dataPoint: any = { station: station.code };
  
  trainSchedules.forEach(train => {
    const stationTime = train.stations.find(s => s.station === station.code);
    if (stationTime) {
      dataPoint[train.id] = stationTime.time;
    }
  });
  
  return dataPoint;
});

// Custom tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const station = stations.find(s => s.code === label);
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-bold">Station: {label}</p>
        {payload.map((entry: any, index: number) => {
          const train = trainSchedules.find(t => t.id === entry.dataKey);
          const time = new Date(0);
          time.setMinutes(entry.value);
          const timeString = time.toTimeString().slice(0, 5);
          
          return (
            <p key={index} style={{ color: entry.color }}>
              {train?.direction}: {timeString}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

export function TrainScheduleChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">VR-CHG SECTION WTT-98</CardTitle>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-500"></div>
            <span>BL-ST Trains</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500"></div>
            <span>ST-BL Trains</span>
          </div>
        </div>
        
        {/* Throughput Analysis */}
        <div className="grid grid-cols-4 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="text-sm font-semibold">Total Trains</div>
            <div className="text-lg font-bold">8</div>
          </div>
          <div>
            <div className="text-sm font-semibold">On-Time</div>
            <div className="text-lg font-bold text-green-600">37.5%</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Delayed</div>
            <div className="text-lg font-bold text-red-600">5</div>
          </div>
          <div>
            <div className="text-sm font-semibold">Efficiency</div>
            <div className="text-lg font-bold text-blue-600">62.5%</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <ResponsiveContainer width="100%" height={600}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 60, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            
            {/* X Axis - Stations */}
            <XAxis 
              dataKey="station" 
              type="category"
              label={{ value: "Stations", position: "insideBottom", offset: -10 }}
            />
            
            {/* Y Axis - Time */}
            <YAxis 
              type="number"
              domain={[700, 1350]}
              tickFormatter={(value) => {
                const hours = Math.floor(value / 60);
                const minutes = value % 60;
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
              }}
              label={{ value: "Time (24-Hour Format)", angle: -90, position: "insideLeft" }}
            />
            
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {/* Hour reference lines */}
            {[720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320].map((time, index) => (
              <ReferenceLine 
                key={time}
                y={time}
                stroke="#e5e7eb"
                strokeDasharray="2 2"
                label={{
                  value: `${Math.floor(time/60)}:00`,
                  position: 'right',
                  fill: '#6b7280',
                  fontSize: 12
                }}
              />
            ))}
            
            {/* Train lines */}
            {trainSchedules.map((train) => (
              <Line
                key={train.id}
                type="monotone"
                dataKey={train.id}
                stroke={train.color}
                strokeWidth={2}
                dot={{ fill: train.color, r: 4 }}
                activeDot={{ r: 6 }}
                name={train.direction}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        
        {/* Station names */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>VR → BS → NSL → MR → DS → BO → AND → BND → DR → MCT → CHG</p>
        </div>
        
     
      </CardContent>
    </Card>
  );
}

