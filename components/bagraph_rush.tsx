import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { day: "Mon", morning: 2500, daytime: 2000, evening: 2200, offpeak: 500 },
  { day: "Tue", morning: 2300, daytime: 2100, evening: 2100, offpeak: 600 },
  { day: "Wed", morning: 2400, daytime: 2200, evening: 2300, offpeak: 700 },
  { day: "Thu", morning: 2350, daytime: 2150, evening: 2250, offpeak: 650 },
  { day: "Fri", morning: 2600, daytime: 2300, evening: 2500, offpeak: 900 },
  { day: "Sat", morning: 1200, daytime: 2000, evening: 1700, offpeak: 1500 },
  { day: "Sun", morning: 600, daytime: 1800, evening: 1200, offpeak: 1400 },
];

export  function PeakHoursChart() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-[#f8fcff] rounded-2xl shadow">
      <h2 className="text-2xl font-bold mb-4">Peak Hours</h2>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} stackOffset="expand" margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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
    </div>
  );
}
