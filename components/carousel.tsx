"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { RailwayAlert } from "@/components/railway_alert";

type AlertType = "danger" | "success" | "info" |"warning";

export type Alert = {
  message: string;
  time: string;
  type: AlertType;
  station: string;
};

interface RailwayAlertCarouselProps {
  alerts: Alert[];
  interval?: number;
}

export function RailwayAlertCarousel({
  alerts,
  interval = 3000,
}: RailwayAlertCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!alerts || alerts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alerts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [alerts, interval]);

  if (!alerts || alerts.length === 0) return null;

  const currentAlert = alerts[currentIndex];

  // Map alert type to Tailwind background color
  const bgColor =
    currentAlert.type === "danger"
      ? "bg-red-500"
      : currentAlert.type === "warning"
      ? "bg-yellow-500"
      : "bg-blue-600"; // info

  return (
    <div className="relative h-52 w-full overflow-hidden">
      <Image
        src="/images/person 1.png"
        alt="Control Panel"
        fill
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-center justify-center transition-all duration-500">
        <RailwayAlert
          message={`${currentAlert.message} at ${currentAlert.station}`}
          time={currentAlert.time}
          type={currentAlert.type} // ✅ Only pass the type string
        />
      </div>
    </div>
  );
}
