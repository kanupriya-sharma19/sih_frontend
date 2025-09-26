"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function PlatformOccupancy() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Occupancy Chart</CardTitle>
      </CardHeader>
      <CardContent className="relative h-64">
        <Image
          src="/images/image (2) 4.png" // place image inside /public
          alt="Control Panel"
          fill
          className="object-cover rounded-lg"
        />
      </CardContent>
    </Card>
  )
}
