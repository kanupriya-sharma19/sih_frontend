"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Info, CheckCircle } from "lucide-react"

const alerts = [
  {
    type: "warning",
    message: "Train 12345 delayed by 15 minutes due to signal issues",
    time: "2 mins ago",
  },
  {
    type: "info",
    message: "Platform 3 cleaning scheduled for 16:30-17:00",
    time: "5 mins ago",
  },
  {
    type: "success",
    message: "All safety systems operational",
    time: "10 mins ago",
  },
]

export function RealTimeAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => (
          <Alert
            key={index}
            className={
              alert.type === "warning"
                ? "border-destructive/50"
                : alert.type === "info"
                  ? "border-primary/50"
                  : "border-green-500/50"
            }
          >
            {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-destructive" />}
            {alert.type === "info" && <Info className="h-4 w-4 text-primary" />}
            {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-500" />}
            <AlertDescription>
              <div className="flex justify-between items-start">
                <span>{alert.message}</span>
                <span className="text-xs text-muted-foreground ml-2">{alert.time}</span>
              </div>
            </AlertDescription>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
