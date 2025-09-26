"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function BotsPlatformChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bots Platform Occupation Chart</CardTitle>
      </CardHeader>
      <CardContent className="relative h-64">
        <Image
          src="/images/bots.png" // place image inside /public
          alt="Control Panel"
          fill
          className="object-cover rounded-lg"
        />
      </CardContent>
    </Card>
  )
}
