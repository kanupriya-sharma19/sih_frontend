"use client"

import { AlertTriangle, Info, CheckCircle } from "lucide-react"

interface RailwayAlertProps {
  message: string
  time: string
  type?: "danger" | "info" | "success" |"warning"
  className?: string
}

export function RailwayAlert({ message, time, type, className }: RailwayAlertProps) {
  const bgColor =
    type === "danger"
      ? "bg-red-200 text-red-800"
      : type === "success"
      ? "bg-green-200 text-green-800"
      : "bg-blue-200 text-blue-800" 

  const Icon =
    type === "danger"
      ? AlertTriangle
      : type === "info"
      ? Info
      : CheckCircle

  return (
    <div className={`flex items-center space-x-3 px-4 py-2 rounded-lg ${bgColor} ${className}`}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <div className="flex flex-col">
        <span className="font-semibold">{message}</span>
        <span className="text-xs text-black">{time}</span>
      </div>
    </div>
  )
}
