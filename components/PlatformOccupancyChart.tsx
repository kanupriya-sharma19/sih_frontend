// components/PlatformOccupancyChart.tsx

'use client'; // This directive is necessary for client-side libraries like Plotly

import React from 'react';
import dynamic from 'next/dynamic';
import type { Data, Layout, Config } from 'plotly.js';

// Dynamically import Plotly to prevent SSR issues, as it relies on the 'window' object
const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

// Define a type for our train schedule entries for better type safety
interface TrainEntry {
  platform: string;
  train: string;
  day: 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';
  arrival: string;
  departure: string;
}

export function PlatformOccupancyChart() {
  // --- Data and Logic exactly from your HTML file ---
  const trainSchedule: TrainEntry[] = [
    // Platform 1
    { platform: 'Platform-1', train: '19218 VRL', day: 'Sun', arrival: '04:55', departure: '05:10' },
    { platform: 'Platform-1', train: '12471 SWV', day: 'Sun', arrival: '10:40', departure: '10:55' },
    { platform: 'Platform-1', train: '21902 BVC', day: 'Sun', arrival: '17:40', departure: '17:55' },
    { platform: 'Platform-1', train: '19015 GKP', day: 'Mon', arrival: '04:55', departure: '05:10' },
    { platform: 'Platform-1', train: '04126 BDTS', day: 'Mon', arrival: '15:10', departure: '15:25' },
    { platform: 'Platform-1', train: '22195 VGLJ', day: 'Tue', arrival: '04:55', departure: '05:10' },
    { platform: 'Platform-1', train: '22475 BKN', day: 'Wed', arrival: '12:40', departure: '12:55' },
    { platform: 'Platform-1', train: '12901 ADI', day: 'Wed', arrival: '18:00', departure: '18:20' },
    { platform: 'Platform-1', train: '22444 CNB', day: 'Thu', arrival: '04:55', departure: '05:10' },
    { platform: 'Platform-1', train: '20901 LJN', day: 'Sat', arrival: '10:10', departure: '10:25' },

    // Platform 2
    { platform: 'Platform-2', train: '22954 SHUJ', day: 'Sun', arrival: '04:55', departure: '05:05' },
    { platform: 'Platform-2', train: '20942 SGCT', day: 'Sun', arrival: '21:30', departure: '21:45' },
    { platform: 'Platform-2', train: '14701 SDNR', day: 'Mon', arrival: '05:15', departure: '05:30' },
    { platform: 'Platform-2', train: '89007 AII', day: 'Mon', arrival: '08:15', departure: '08:30' },
    { platform: 'Platform-2', train: '12009 BCT', day: 'Mon', arrival: '13:05', departure: '13:15' },
    { platform: 'Platform-2', train: '22934 JP', day: 'Tue', arrival: '05:15', departure: '05:30' },
    { platform: 'Platform-2', train: '12957 NDLS', day: 'Tue', arrival: '17:05', departure: '17:30' },
    { platform: 'Platform-2', train: '12926 ADI', day: 'Wed', arrival: '05:15', departure: '05:30' },
    { platform: 'Platform-2', train: '12951 CSM', day: 'Wed', arrival: '10:10', departure: '10:25' },
    { platform: 'Platform-2', train: '12932 BVI', day: 'Fri', arrival: '04:55', departure: '05:05' },

    // Platform 3
    { platform: 'Platform-3', train: '19016', day: 'Sun', arrival: '05:10', departure: '05:20' },
    { platform: 'Platform-3', train: '12971 BVC', day: 'Sun', arrival: '18:55', departure: '19:10' },
    { platform: 'Platform-3', train: '22928 ADI', day: 'Mon', arrival: '06:05', departure: '06:20' },
    { platform: 'Platform-3', train: '12972 BVC', day: 'Mon', arrival: '08:15', departure: '08:30' },
    { platform: 'Platform-3', train: '19217 VRL', day: 'Mon', arrival: '12:40', departure: '13:00' },
    { platform: 'Platform-3', train: '22928 ADI', day: 'Tue', arrival: '06:05', departure: '06:20' },
    { platform: 'Platform-3', train: '12971 BVC', day: 'Tue', arrival: '18:55', departure: '19:10' },
    { platform: 'Platform-3', train: '19015 HSR', day: 'Wed', arrival: '18:55', departure: '19:10' },
    { platform: 'Platform-3', train: '22930 VLLI', day: 'Thu', arrival: '04:55', departure: '05:10' },
    { platform: 'Platform-3', train: '14701 SGN', day: 'Thu', arrival: '08:15', departure: '08:30' },
  ];

  const today = '2025-09-27';
  const data: Data[] = [];
  const dayOrder: { [key: string]: number } = { Sun: 1, Mon: 2, Tue: 3, Wed: 4, Thu: 5, Fri: 6, Sat: 7 };

  const yAxisLabels = [...new Set(trainSchedule.map((item) => `${item.platform} | ${item.day}`))]
    .sort((a, b) => {
      const [platA, dayA] = a.split(' | ');
      const [platB, dayB] = b.split(' | ');
      if (platA < platB) return -1;
      if (platA > platB) return 1;
      return dayOrder[dayA] - dayOrder[dayB];
    })
    .reverse();

  const colors = ['#BFDBFE', '#A7F3D0', '#FDE68A', '#FECACA', '#DDD6FE', '#FBCFE8'];
  const borderColors = ['#60A5FA', '#34D399', '#FBBF24', '#F87171', '#A78BFA', '#F472B6'];

  const platformColorMap: { [key: string]: { bg: string; border: string } } = {};
  const platforms = [...new Set(trainSchedule.map((item) => item.platform))].sort();
  platforms.forEach((p, i) => {
    platformColorMap[p] = {
      bg: colors[i % colors.length],
      border: borderColors[i % borderColors.length],
    };
  });

  trainSchedule.forEach((train) => {
    const startTime = new Date(`${today}T${train.arrival}:00`);
    const endTime = new Date(`${today}T${train.departure}:00`);
    const yCategory = `${train.platform} | ${train.day}`;

    const hoverText =
      `<b>Train:</b> ${train.train}<br>` +
      `<b>Platform:</b> ${train.platform}<br>` +
      `<b>Day:</b> ${train.day}<br>` +
      `<b>Arrival:</b> ${train.arrival}<br>` +
      `<b>Departure:</b> ${train.departure}`;

    const barText = `<b>A-${train.arrival} D-${train.departure}<br>${train.train}</b>`;

    data.push({
      type: 'bar',
      x: [(endTime.getTime() - startTime.getTime()) * 10],
      y: [yCategory, yCategory],
      base: [startTime],
      orientation: 'h',
      name: train.train,
      text: barText,
      hoverinfo: 'text',
      hovertext: hoverText,
      marker: {
        color: platformColorMap[train.platform].bg,
        line: { color: platformColorMap[train.platform].border, width: 1.5 },
      },
      textfont: { color: '#1F2937', size: 9, family: 'Inter, sans-serif', weight: 500 },
      textposition: 'inside',
      insidetextanchor: 'middle',
      showlegend: true,
      width: 0.8,
    } as any); // Cast to any to allow 'base' property
  });

  const layout: Partial<Layout> = {
    xaxis: {
      type: 'date',
      tickformat: '%H',
     title: { text: 'Time of Day (24 Hour Clock)' },
      automargin: true,
      range: [new Date(`${today}T00:00:00`), new Date(`${today}T23:59:59`)],
      dtick: 3600000,
      gridcolor: '#E5E7EB',
      tickfont: { size: 10 },
    },
    yaxis: {
      type: 'category',
      title: { text: 'Platform & Day' },
      automargin: true,
      categoryorder: 'array',
      categoryarray: yAxisLabels,
      gridcolor: '#E5E7EB',
      tickfont: { size: 11 },
    },
    margin: { l: 130, r: 20, t: 50, b: 70 },
    plot_bgcolor: '#FFFFFF',
    paper_bgcolor: '#FFFFFF',
    showlegend: false,
    hovermode: 'closest',
  };

  const config: Partial<Config> = {
    responsive: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['select2d', 'lasso2d'],
  };

  // --- JSX rendering to match your HTML structure and styling ---
  return (
    <div className="bg-gray-100 text-gray-800">
      <div className="container mx-auto p-4 md:p-8">
        <header className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Railway Platform Occupancy</h1>
          <p className="text-md text-gray-600 mt-2">
            Interactive chart showing train schedules on platforms over a 24-hour period.
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-4">
          <Plot
            data={data}
            layout={layout}
            config={config}
            // This style prop replaces the .plot-container CSS class from your HTML file
            style={{ width: '100%', height: '90vh' }}
            useResizeHandler={true}
          />
        </div>
      </div>
    </div>
  );
}