// components/TrainScheduleChart.tsx

'use client'; // This directive is necessary for client-side libraries like Plotly

import React from 'react';
import dynamic from 'next/dynamic';
import type { Data, Layout, Config } from 'plotly.js';

// Dynamically import Plotly to prevent SSR issues
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

// --- Type Definitions for our Data ---
interface Station {
  name: string;
  distance: number; // in km
}

interface Stop {
  stationName: string;
  time: string; // "HH:mm" format
}

interface Train {
  trainNumber: string;
  direction: 'up' | 'down';
  schedule: Stop[];
}

// --- Main Chart Component ---
export function TrainChart() {
  // --- Data Setup ---
  // 1. Define the stations and their distance from the start (CCG)
  const stations: Station[] = [
    { name: 'CCG', distance: 0.0 },
    { name: 'BCT', distance: 4.48 },
    { name: 'DDR', distance: 10.17 },
    { name: 'BA', distance: 14.86 },
    { name: 'BDTS', distance: 15.29 },
    { name: 'STC', distance: 17.61 },
    { name: 'ADH', distance: 21.83 },
    { name: 'GMN', distance: 26.9 },
    { name: 'MDD', distance: 29.32 },
    { name: 'BVI', distance: 33.98 },
    { name: 'BYR', distance: 43.11 },
    { name: 'BSR', distance: 51.78 },
    { name: 'VR', distance: 59.98 },
  ];

  // 2. Sample train data (mocked up from your image)
  const trains: Train[] = [
    {
      trainNumber: '90768',
      direction: 'down', // Red line (CCG -> VR)
      schedule: [
        { stationName: 'BCT', time: '19:02' },
        { stationName: 'DDR', time: '19:12' },
        { stationName: 'BA', time: '19:18' },
        { stationName: 'STC', time: '19:22' },
        { stationName: 'BVI', time: '19:35' },
        { stationName: 'BSR', time: '19:48' },
        { stationName: 'VR', time: '19:56' },
      ],
    },
    {
      trainNumber: '91152',
      direction: 'down', // Red line (CCG -> VR)
      schedule: [
        { stationName: 'CCG', time: '21:50' },
        { stationName: 'BCT', time: '21:58' },
        { stationName: 'DDR', time: '22:08' },
        { stationName: 'BA', time: '22:14' },
        { stationName: 'STC', time: '22:18' },
        { stationName: 'BVI', time: '22:31' },
        { stationName: 'BSR', time: '22:44' },
        { stationName: 'VR', time: '22:52' },
      ],
    },
    {
      trainNumber: '92115',
      direction: 'up', // Blue line (VR -> CCG)
      schedule: [
        { stationName: 'VR', time: '18:50' },
        { stationName: 'BSR', time: '18:58' },
        { stationName: 'BYR', time: '19:06' },
        { stationName: 'BVI', time: '19:15' },
        { stationName: 'MDD', time: '19:21' },
        { stationName: 'ADH', time: '19:28' },
        { stationName: 'BA', time: '19:35' },
        { stationName: 'DDR', time: '19:42' },
        { stationName: 'BCT', time: '19:55' },
        { stationName: 'CCG', time: '20:03' },
      ],
    },
     {
      trainNumber: '90815',
      direction: 'up', // Blue line (VR -> CCG)
      schedule: [
        { stationName: 'BVI', time: '20:00' },
        { stationName: 'MDD', time: '20:06' },
        { stationName: 'ADH', time: '20:13' },
        { stationName: 'STC', time: '20:17' },
        { stationName: 'BA', time: '20:22' },
        { stationName: 'DDR', time: '20:29' },
        { stationName: 'BCT', time: '20:42' },
        { stationName: 'CCG', time: '20:50' },
      ],
    },
  ];

  // --- Data Processing for Plotly ---
  const today = '2025-09-28'; // A fixed date for the time axis
  const stationMap = new Map(stations.map((s) => [s.name, s.distance]));

  const chartData: Data[] = trains.map((train) => {
    const xValues: Date[] = [];
    const yValues: number[] = [];
    const hoverTexts: string[] = [];

    train.schedule.forEach((stop) => {
      const distance = stationMap.get(stop.stationName);
      if (distance !== undefined) {
        xValues.push(new Date(`${today}T${stop.time}:00`));
        yValues.push(distance);
        hoverTexts.push(
          `<b>Train:</b> ${train.trainNumber}<br>` +
          `<b>Station:</b> ${stop.stationName}<br>` +
          `<b>Time:</b> ${stop.time}`
        );
      }
    });

    return {
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines',
      name: `Train ${train.trainNumber}`,
      line: {
        color: train.direction === 'down' ? 'red' : 'blue',
        width: 1.5,
      },
      hoverinfo: 'text',
      text: hoverTexts,
    };
  });

  // --- Chart Layout and Configuration ---
  const layout: Partial<Layout> = {
    title: {text: 'Train Schedule Chart (CCG-VR Section)'},
    xaxis: {
      title: {text:'Time (24 Hour Clock)'},
      type: 'date',
      tickformat: '%H:%M',
      dtick: 3600000, // One hour in milliseconds
      gridcolor: '#e9e9e9',
      range: [
        new Date(`${today}T18:00:00`),
        new Date(`${today}T24:00:00`)
      ]
    },
    yaxis: {
      title: {text:'Station'},
      // To match the image, we reverse the axis so CCG (0km) is at the top
      autorange: 'reversed',
      // Create custom labels for the y-axis
      tickmode: 'array',
      tickvals: stations.map(s => s.distance),
      ticktext: stations.map(s => `${s.name} ${s.distance.toFixed(2)}`),
      gridcolor: '#e9e9e9',
    },
    hovermode: 'closest',
    showlegend: false, // Hiding the legend to keep the chart clean like the image
    plot_bgcolor: '#FFFFFF',
    paper_bgcolor: '#FFFFFF',
    margin: { l: 80, r: 20, t: 50, b: 70 },
  };

  const config: Partial<Config> = {
    responsive: true,
    displaylogo: false,
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
       <Plot
          data={chartData}
          layout={layout}
          config={config}
          style={{ width: '100%', height: '90vh' }}
        />
    </div>
  );
}