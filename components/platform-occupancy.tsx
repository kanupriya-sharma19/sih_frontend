"use client";

import React, { useRef, useEffect, useState } from "react";
import Highcharts from "highcharts/highcharts-gantt";
import HighchartsReact, { HighchartsReactRefObject } from "highcharts-react-official";

// Train type
type Train = { start?: number; end?: number; type?: string; color?: string; value?: number };

// Main chart component
export function PlatformOccupancy() {
  const chartComponentRef = useRef<HighchartsReactRefObject>(null);
  const [isModuleLoaded, setIsModuleLoaded] = useState(false);

  // your data
  const today = "2025-09-28";
  const trainSchedule = [
    // Platform 1
    { platform: "Platform-1", train: "19218 VRL", day: "Sun", arrival: "04:55", departure: "05:10" },
    { platform: "Platform-1", train: "12471 SWV", day: "Sun", arrival: "10:40", departure: "10:55" },
    { platform: "Platform-1", train: "21902 BVC", day: "Sun", arrival: "17:40", departure: "17:55" },
    { platform: "Platform-1", train: "19015 GKP", day: "Mon", arrival: "04:55", departure: "05:10" },
    { platform: "Platform-1", train: "04126 BDTS", day: "Mon", arrival: "15:10", departure: "15:25" },
    { platform: "Platform-1", train: "22195 VGLJ", day: "Tue", arrival: "04:55", departure: "05:10" },
    { platform: "Platform-1", train: "22475 BKN", day: "Wed", arrival: "12:40", departure: "12:55" },
    { platform: "Platform-1", train: "12901 ADI", day: "Wed", arrival: "18:00", departure: "18:20" },
    { platform: "Platform-1", train: "22444 CNB", day: "Thu", arrival: "04:55", departure: "05:10" },
    { platform: "Platform-1", train: "20901 LJN", day: "Sat", arrival: "10:10", departure: "10:25" },

    // Platform 2
    { platform: "Platform-2", train: "22954 SHUJ", day: "Sun", arrival: "04:55", departure: "05:05" },
    { platform: "Platform-2", train: "20942 SGCT", day: "Sun", arrival: "21:30", departure: "21:45" },
    { platform: "Platform-2", train: "14701 SDNR", day: "Mon", arrival: "05:15", departure: "05:30" },
    { platform: "Platform-2", train: "89007 AII", day: "Mon", arrival: "08:15", departure: "08:30" },
    { platform: "Platform-2", train: "12009 BCT", day: "Mon", arrival: "13:05", departure: "13:15" },
    { platform: "Platform-2", train: "22934 JP", day: "Tue", arrival: "05:15", departure: "05:30" },
    { platform: "Platform-2", train: "12957 NDLS", day: "Tue", arrival: "17:05", departure: "17:30" },
    { platform: "Platform-2", train: "12926 ADI", day: "Wed", arrival: "05:15", departure: "05:30" },
    { platform: "Platform-2", train: "12951 CSM", day: "Wed", arrival: "10:10", departure: "10:25" },
    { platform: "Platform-2", train: "12932 BVI", day: "Fri", arrival: "04:55", departure: "05:05" },

    // Platform 3
    { platform: "Platform-3", train: "19016", day: "Sun", arrival: "05:10", departure: "05:20" },
    { platform: "Platform-3", train: "12971 BVC", day: "Sun", arrival: "18:55", departure: "19:10" },
    { platform: "Platform-3", train: "22928 ADI", day: "Mon", arrival: "06:05", departure: "06:20" },
    { platform: "Platform-3", train: "12972 BVC", day: "Mon", arrival: "08:15", departure: "08:30" },
    { platform: "Platform-3", train: "19217 VRL", day: "Mon", arrival: "12:40", departure: "13:00" },
    { platform: "Platform-3", train: "22928 ADI", day: "Tue", arrival: "06:05", departure: "06:20" },
    { platform: "Platform-3", train: "12971 BVC", day: "Tue", arrival: "18:55", departure: "19:10" },
    { platform: "Platform-3", train: "19015 HSR", day: "Wed", arrival: "18:55", departure: "19:10" },
    { platform: "Platform-3", train: "22930 VLLI", day: "Thu", arrival: "04:55", departure: "05:10" },
    { platform: "Platform-3", train: "14701 SGN", day: "Thu", arrival: "08:15", departure: "08:30" },
  ];

  // compute categories
  const categories = Array.from(new Set(trainSchedule.map((t) => `${t.platform} | ${t.day}`)));

  // color map per platform
  const colorMap: Record<string, string> = {
    "Platform-1": "#BFDBFE",
    "Platform-2": "#A7F3D0",
    "Platform-3": "#FDE68A",
  };

  // compute day start/min & max (local midnight to next midnight - 1ms)
  const dayStart = new Date(today);
  dayStart.setHours(0, 0, 0, 0);
  const minTime = dayStart.getTime();
  const maxTime = minTime + 24 * 3600 * 1000 - 1;

  // build tick positions (every hour, inclusive)
  const tickPositions = Array.from({ length: 25 }, (_, i) => minTime + i * 3600 * 1000);

  // tasks (with color)
  const tasks = trainSchedule.map((train, i) => {
    const start = new Date(`${today}T${train.arrival}:00`).getTime();
    const end = new Date(`${today}T${train.departure}:00`).getTime();
    const categoryLabel = `${train.platform} | ${train.day}`;
    return {
      id: `train-${i}`,
      name: train.train,
      start,
      end,
      y: categories.indexOf(categoryLabel),
      custom: train,
      color: colorMap[train.platform] || "#9E9E9E",
    };
  });

  // Load gantt module client-side and then force axis extremes after mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    // load module safely on client
    try {
      // require here so it's executed only on client
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("highcharts/modules/gantt")(Highcharts);
    } catch (e) {
      // module may already be loaded — ignore
    }
    setIsModuleLoaded(true);

    // After a short delay (next tick) force the axis extremes so Highcharts doesn't auto-extend
    const t = setTimeout(() => {
      const hcChart = (chartComponentRef.current as any)?.chart;
      if (hcChart && hcChart.xAxis && hcChart.xAxis[0]) {
        try {
          hcChart.xAxis[0].setExtremes(minTime, maxTime, true, false);
        } catch (err) {
          // ignore if not ready yet
        }
      }
    }, 50);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const options: Highcharts.Options = {
    chart: { type: "gantt", height: "100%" },
    title: { text: "Railway Platform Occupancy" },

    xAxis: {
      type: "datetime",
      tickInterval: 3600 * 1000,
      min: minTime,
      max: maxTime,
      startOnTick: false,
      endOnTick: false,
      minPadding: 0,
      maxPadding: 0,
      tickPositions,
      labels: { format: "{value:%H:%M}" },
      title: { text: " " },
    },

    yAxis: {
      type: "category",
      categories,
      title: { text: "Platform & Day" },
    },

    tooltip: {
      pointFormatter: function () {
        const t = (this as any).custom;
        return `<b>Train:</b> ${t.train}<br/>
                <b>Platform:</b> ${t.platform}<br/>
                <b>Day:</b> ${t.day}<br/>
                <b>Arrival:</b> ${t.arrival}<br/>
                <b>Departure:</b> ${t.departure}`;
      },
    },

    series: [
      {
        type: "gantt",
        name: "Train Schedule",
        data: tasks,
        colorByPoint: true,
      },
    ],

    plotOptions: {
      series: {
        dataLabels: {
          enabled: true,
          format: "{point.name}",
        },
      },
    },
  };

  // Show the chart only after module loaded to avoid any SSR hiccups
  if (!isModuleLoaded) {
    return <div className="p-6 text-center">Loading chart...</div>;
  }

  return (
    <div className="bg-gray-100 text-gray-800 font-inter">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Railway Platform Occupancy</h1>
          <p className="text-md text-gray-600 mt-2">
            Interactive Gantt chart showing train schedules on platforms over a 24-hour period.
          </p>
        </header>
        <div className="bg-white rounded-lg shadow-lg p-4">
          <HighchartsReact highcharts={Highcharts} constructorType="ganttChart" options={options} ref={chartComponentRef} />
        </div>
      </div>
    </div>
  );
}
