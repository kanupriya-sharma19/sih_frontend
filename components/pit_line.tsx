"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function PitLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pit Line Occupation Chart</CardTitle>
      </CardHeader>
      <CardContent className="relative h-64">
        <Image
          src="/images/pit.png" // place image inside /public
          alt="Control Panel"
          fill
          className="object-cover rounded-lg"
        />
      </CardContent>
    </Card>
  )
}
