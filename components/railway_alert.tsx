import { AlertTriangle } from "lucide-react"

interface RailwayAlertProps {
  title?: string
  message: string
  time: string
}

export function RailwayAlert({ title = "Alert", message, time }: RailwayAlertProps) {
  return (
    <div className="flex items-center justify-between bg-red-500 w-1/3 text-white rounded-lg px-4 py-3 shadow-md">
      {/* Left Section: Icon + Title + Message */}
      <div className="flex items-center space-x-3">
        <div className="bg-white text-black p-2 rounded-md">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-lg">{title}</span>
          <span className="italic">{message}</span>
        </div>
      </div>

      {/* Right Section: Time */}
      <div className="font-bold">{time}</div>
    </div>
  )
}
