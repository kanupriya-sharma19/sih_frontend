"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function PlatformOccupancy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Occupancy Chart</CardTitle>
      </CardHeader>
      <CardContent className="relative h-64">
        <Image
          src="/images/image (2) 4.png" // place image inside /public
          alt="Control Panel"
          fill
          className="object-cover rounded-lg"
        />
      </CardContent>
    </Card>
  )
}

// "use client"

// import Plot from "react-plotly.js"
// import { Data } from "plotly.js"

// const platforms = ["Platform 1", "Platform 2", "Platform 3", "Platform 4", "Platform 5"]

// export function PlatformOccupancy() {
//   // Sample data
//   const data: Data[] = [
//     {
//       type: "bar",
//       orientation: "h",
//       x: [2], // duration
//       y: ["Platform 1"],
//       marker: { color: "#FFD700" }, // Express (yellow)
//       name: "Train 12345",
//       hoverinfo: "text",
//       text: ["Train 12345<br>06:00 - 08:00<br>Express<br>Status: On Time"], // must be an array
//     },
//     {
//       type: "bar",
//       orientation: "h",
//       x: [2],
//       y: ["Platform 2"],
//       marker: { color: "#87CEEB" }, // Passenger (blue)
//       name: "Train 54321",
//       hoverinfo: "text",
//       text: ["Train 54321<br>08:30 - 10:30<br>Passenger<br>Status: Delayed 12m"],
//     },
//   ]

//   const layout = {
//     title: "🚉 Platform Occupancy Dashboard",
//     barmode: "stack",
//     xaxis: {
//       title: "Time (hrs)",
//       range: [5, 23],
//       tickvals: [6, 8, 10, 12, 14, 16, 18, 20, 22],
//       ticktext: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"],
//     },
//     yaxis: {
//       title: "Platforms",
//       tickvals: platforms,
//     },
//     height: 600,
//     showlegend: false,
//     plot_bgcolor: "white",
//     paper_bgcolor: "#fafafa",
//   }

//   return (
//     <div className="w-full overflow-x-auto">
//       <Plot
//         data={data}
//         layout={layout}
//         config={{ responsive: true, displayModeBar: false }}
//         style={{ width: "100%", height: "100%" }}
//       />
//     </div>
//   )
// }
