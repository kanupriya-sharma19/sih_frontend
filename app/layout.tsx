import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import { Roboto} from "next/font/google"

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
})

import "./globals.css"
import { PageTransitionWrapper } from "@/components/page_wrapper"

export const metadata: Metadata = {
  title: "Drishti",
  description: "Created with v0",
  generator: "v0.app",
  icons:'/images/image.png'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      {/* ✅ Apply roboto globally */}
      <body className={roboto.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
