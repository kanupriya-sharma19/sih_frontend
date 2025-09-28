"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, Info, CheckCircle } from "lucide-react"

type AlertItem = {
  type: "warning" | "info" | "success"
  message: string
  time: string
}

interface RealTimeAlertsProps {
  alerts: AlertItem[]
}

export function RealTimeAlerts({ alerts }: RealTimeAlertsProps) {
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
