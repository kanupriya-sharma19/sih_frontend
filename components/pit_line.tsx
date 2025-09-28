"use client"
import React, { useState } from 'react';

interface Session {
  start: string;
  end: string;
  type: string;
}

interface DayData {
  day: string;
  sessions: Session[];
}

interface PitData {
  pit: string;
  days: DayData[];
}

interface HoveredSession extends Session {
  pit: string;
  day: string;
  position: { x: number; y: number }; // tooltip coordinates
}

export function PitLineChart() {
  const pitData: PitData[] = [
    {
      pit: 'Pit 1',
      days: [
        { day: 'Mon', sessions: [{ start: '12:00', end: '17:59', type: 'STB' }] },
        { day: 'Tue', sessions: [{ start: '12:00', end: '17:59', type: 'STB' }] },
        { day: 'Wed', sessions: [{ start: '12:00', end: '17:59', type: 'STB' }] },
        { day: 'Thu', sessions: [{ start: '12:00', end: '17:59', type: 'POWER CAR' }] },
        { day: 'Fri', sessions: [{ start: '12:00', end: '17:59', type: 'STB' }] },
        { day: 'Sat', sessions: [{ start: '12:00', end: '17:59', type: 'STB' }] },
        { day: 'Sun', sessions: [{ start: '20:00', end: '23:59', type: 'STB' }] },
      ]
    },
    {
      pit: 'Pit 2',
      days: [
        { day: 'Mon', sessions: [
          { start: '08:00', end: '11:59', type: 'WPD POWER CAR' },
          { start: '20:00', end: '23:59', type: 'WBHG' }
        ]},
        { day: 'Tue', sessions: [] },
        { day: 'Wed', sessions: [] },
        { day: 'Thu', sessions: [
          { start: '08:00', end: '11:59', type: 'WPD POWER CAR' },
          { start: '14:00', end: '17:59', type: 'STB' }
        ]},
        { day: 'Fri', sessions: [{ start: '12:00', end: '17:59', type: 'STB' }] },
        { day: 'Sat', sessions: [{ start: '12:00', end: '17:59', type: 'STB' }] },
        { day: 'Sun', sessions: [
          { start: '08:00', end: '11:59', type: 'WPD POWER CAR' },
          { start: '20:00', end: '23:59', type: 'WBHG' }
        ]},
      ]
    },
  ];

  // Time slots
  const timeSlots = [];
  for (let i = 0; i < 24; i++) {
    timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
  }

  const timeToPercent = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number);
    return ((hours + minutes / 60) / 24) * 100;
  };

  const getSessionWidth = (start: string, end: string): number => {
    return timeToPercent(end) - timeToPercent(start);
  };

  const getSessionColor = (type: string): string => {
    const colors: Record<string, string> = {
      'STB': '#BFDBFE',
      'POWER CAR': '#A7F3D0',
      'WPD POWER CAR': '#FDE68A',
      'WBHG': '#DDA0DD',
      'default': '#90EE90'
    };
    return colors[type] || colors.default;
  };

  const [hoveredSession, setHoveredSession] = useState<HoveredSession | null>(null);

  return (
    <div className="w-full p-4 bg-white relative">
      <h2 className="text-xl font-bold mb-4 text-center">Pit Utilization Schedule</h2>

      {/* Time Header */}
      <div className="flex mb-2">
        <div className="w-32 flex-shrink-0"></div>
        <div className="flex-1 relative">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            {timeSlots.filter((_, i) => i % 2 === 0).map((time: string) => (
              <span key={time} className="text-center">{time}</span>
            ))}
          </div>
          <div className="h-px bg-gray-300"></div>
        </div>
      </div>

      {/* Chart Content */}
      <div className="space-y-1">
        {pitData.map((pit) => (
          <div key={pit.pit}>
            {pit.days.map((dayData) => (
              <div key={`${pit.pit}-${dayData.day}`} className="flex items-center h-8 hover:bg-gray-50">
                {/* Y-axis label */}
                <div className="w-32 flex-shrink-0 text-sm font-medium text-gray-700 pr-2">
                  {pit.pit} - {dayData.day}
                </div>

                {/* Timeline */}
                <div className="flex-1 relative h-6 bg-gray-100 border border-gray-200">
                  {/* Hour markers */}
                  {Array.from({ length: 24 }, (_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 bottom-0 w-px bg-gray-300"
                      style={{ left: `${(i / 24) * 100}%` }}
                    />
                  ))}

                  {/* Sessions */}
                  {dayData.sessions.map((session, sessionIndex) => (
                    <div
                      key={sessionIndex}
                      className="absolute top-0.5 bottom-0.5 rounded border border-gray-400 cursor-pointer transition-all duration-200 hover:shadow-md"
                      style={{
                        left: `${timeToPercent(session.start)}%`,
                        width: `${getSessionWidth(session.start, session.end)}%`,
                        backgroundColor: getSessionColor(session.type),
                      }}
                      onMouseEnter={(e) => {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        setHoveredSession({
                          pit: pit.pit,
                          day: dayData.day,
                          ...session,
                          position: { x: rect.left + rect.width / 2, y: rect.top - 10 }
                        });
                      }}
                      onMouseLeave={() => setHoveredSession(null)}
                    >
                      <div className="h-full flex items-center justify-center text-xs font-medium text-gray-800 px-1 truncate">
                        {session.type}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {hoveredSession && (
        <div
          className="fixed z-50 bg-black text-white p-2 rounded text-sm pointer-events-none"
          style={{
            left: hoveredSession.position.x,
            top: hoveredSession.position.y,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div><strong>{hoveredSession.pit} - {hoveredSession.day}</strong></div>
          <div>Type: {hoveredSession.type}</div>
          <div>Time: {hoveredSession.start} - {hoveredSession.end}</div>
        </div>
      )}
      <div className="mt-6 text-center text-black font-medium">
  We can utilize the remaining pit capacity more efficiently to reduce idle time and improve scheduling.
</div>

    </div>
  );
}
