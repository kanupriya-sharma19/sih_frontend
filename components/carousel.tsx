"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { RailwayAlert } from "@/components/railway_alert"

type AlertType = "danger" | "warning" | "info"

export type Alert = {
  message: string
  time: string
  type: AlertType
  station: string
}

interface RailwayAlertCarouselProps {
  alerts: Alert[]
  interval?: number 
}

const alertStyles: Record<AlertType, { bg: string; text: string }> = {
  danger: { bg: "bg-red-600/90", text: "text-white" },
  warning: { bg: "bg-yellow-400/90", text: "text-black" },
  info: { bg: "bg-blue-600/90", text: "text-white" },
}

export function RailwayAlertCarousel({ alerts, interval = 3000 }: RailwayAlertCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!alerts || alerts.length === 0) return
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % alerts.length)
    }, interval)
    return () => clearInterval(timer)
  }, [alerts, interval])

  if (!alerts || alerts.length === 0) return null

  const currentAlert = alerts[currentIndex]
  const { bg, text } = alertStyles[currentAlert.type]

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
        <div className={`px-6 py-3 rounded-lg ${bg} ${text} w-3/5 text-center`}>
          <RailwayAlert
            message={`${currentAlert.message} at ${currentAlert.station}`}
            time={currentAlert.time}
          />
        </div>
      </div>
    </div>
  )
}
