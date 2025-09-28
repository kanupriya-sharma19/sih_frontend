"use client"

import { AlertTriangle, Info, CheckCircle } from "lucide-react"

interface RailwayAlertProps {
  message: string
  time: string
  type?: "danger" | "info" | "success" | "warning"
  className?: string
}

export function RailwayAlert({ message, time, type, className }: RailwayAlertProps) {
  const bgColor =
    type === "danger"
      ? "bg-red-400"
      : type === "success"
      ? "bg-green-400"
      : "bg-blue-400"

  const Icon =
    type === "danger"
      ? AlertTriangle
      : type === "info"
      ? Info
      : CheckCircle

  return (
    <div className={`flex items-center justify-center space-x-3 w-2/5 px-4 py-2 rounded-lg ${bgColor} ${className}`}>
      <Icon className="w-5 h-5 flex-shrink-0 text-black" />
      <div className="flex flex-col items-center text-center">
        <span className="font-semibold text-black text-lg">{message}</span>
        <span className="text-xs text-black">{time}</span>
      </div>
    </div>
  )
}
