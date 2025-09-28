import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  { day: "Mon", morning: 107125, daytime: 85700, evening: 94270, offpeak: 21425 },
  { day: "Tue", morning: 98555, daytime: 89985, evening: 89985, offpeak: 25710 },
  { day: "Wed", morning: 102840, daytime: 94270, evening: 98555, offpeak: 29995 },
  { day: "Thu", morning: 100648, daytime: 92128, evening: 96413, offpeak: 27853 },
  { day: "Fri", morning: 111410, daytime: 98555, evening: 107125, offpeak: 38565 },
  { day: "Sat", morning: 51420, daytime: 85700, evening: 72845, offpeak: 64275 },
  { day: "Sun", morning: 25710, daytime: 77130, evening: 51420, offpeak: 59990 },
];

export function PeakHoursChart() {
  return (
    <Card className="w-full max-w-4xl mx-auto p-6">
      <CardHeader>
        <CardTitle>Peak Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={data}
            stackOffset="expand"
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="morning" stackId="a" fill="#3B82F6" name="Morning Rush (6-9AM)" />
            <Bar dataKey="daytime" stackId="a" fill="#22D3EE" name="Daytime (9AM-5PM)" />
            <Bar dataKey="evening" stackId="a" fill="#A855F7" name="Evening Rush (5-8PM)" />
            <Bar dataKey="offpeak" stackId="a" fill="#6B7280" name="Off-Peak" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
