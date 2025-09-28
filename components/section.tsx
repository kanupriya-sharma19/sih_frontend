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

// ---------------- TYPES ----------------
interface Station {
  code: string;
  name: string;
  position: number;
}

interface TrainStop {
  station: string;
  time: number; // in minutes
}

interface TrainSchedule {
  id: string;
  direction: string;
  color: string;
  stations: TrainStop[];
}

interface TrainPoint {
  time: number;
  position: number;
  trainId: string;
}

interface ChartRow {
  time: number;
  [trainId: string]: number | undefined;
}

// ---------------- DATA ----------------
// Train schedule data
const trainSchedules: TrainSchedule[] = [
  // BL-ST Trains (Red) - Assuming this is VR -> CHG direction
  { 
    id: "BL-ST-1", 
    direction: "VR -> CHG", 
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
    direction: "VR -> CHG", 
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
    direction: "VR -> CHG", 
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
    direction: "VR -> CHG", 
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

  // ST-BL Trains (Blue) - Assuming this is CHG -> VR direction
  { 
    id: "ST-BL-1", 
    direction: "CHG -> VR", 
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
    direction: "CHG -> VR", 
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
    direction: "CHG -> VR", 
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
    direction: "CHG -> VR", 
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
const stations: Station[] = [
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

// ---------------- TRANSFORMATION ----------------
const allPoints: TrainPoint[] = [];
trainSchedules.forEach(train => {
  train.stations.forEach(stop => {
    const stationInfo = stations.find(s => s.code === stop.station);
    if (stationInfo) {
      allPoints.push({
        time: stop.time,
        position: stationInfo.position,
        trainId: train.id,
      });
    }
  });
});

const pointsByTime: Record<number, ChartRow> = allPoints.reduce(
  (acc, point) => {
    if (!acc[point.time]) {
      acc[point.time] = { time: point.time };
    }
    acc[point.time][point.trainId] = point.position;
    return acc;
  },
  {} as Record<number, ChartRow>
);

const chartData: ChartRow[] = Object.values(pointsByTime).sort(
  (a, b) => a.time - b.time
);

// ---------------- CUSTOM TOOLTIP ----------------
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const time = new Date(0);
    time.setMinutes(label);
    const timeString = time.toTimeString().slice(0, 5);

    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="font-bold">Time: {timeString}</p>
        {payload.map((entry: any, index: number) => {
          const station = stations.find(s => s.position === entry.value);
          if (!station) return null;
          return (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey}: <strong>{station.code}</strong>
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};

// ---------------- COMPONENT ----------------
export function TrainScheduleChart() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">VR-CHG SECTION WTT-98</CardTitle>
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-red-500"></div>
            <span>VR → CHG Trains</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-blue-500"></div>
            <span>CHG → VR Trains</span>
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
          <LineChart data={chartData} margin={{ top: 20, right: 60, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            
            {/* X-Axis (Time) */}
            <XAxis 
              type="number"
              dataKey="time"
              domain={['dataMin - 30', 'dataMax + 30']}
              tickFormatter={(value) => {
                const hours = Math.floor(value / 60);
                const minutes = value % 60;
                return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
              }}
              label={{ value: "Time (24-Hour Format)", position: "insideBottom", offset: -20 }}
            />
            
            {/* Y-Axis (Stations) */}
            <YAxis 
              type="number"
              domain={[0, stations.length - 1]}
              ticks={stations.map(s => s.position)}
              tickFormatter={(value) => stations[value]?.code || ""}
              label={{ value: "Stations", angle: -90, position: "insideLeft" }}
              reversed={true}
            />
            
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ bottom: 10 }} />
            
            {/* Reference Lines (Hour Marks) */}
            {[720, 780, 840, 900, 960, 1020, 1080, 1140, 1200, 1260, 1320].map((time) => (
              <ReferenceLine 
                key={time}
                x={time}
                stroke="#e5e7eb"
                strokeDasharray="2 2"
                label={{
                  value: `${Math.floor(time/60)}:00`,
                  position: "top",
                  fill: "#6b7280",
                  fontSize: 12,
                }}
              />
            ))}
            
            {/* Train Lines */}
            {trainSchedules.map((train) => (
              <Line
                key={train.id}
                type="monotone"
                dataKey={train.id}
                stroke={train.color}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                name={train.id}
                connectNulls
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}