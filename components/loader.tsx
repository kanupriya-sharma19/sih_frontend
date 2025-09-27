"use client"

import { useEffect, useRef, useState } from "react"

interface VideoLoaderProps {
  videoSrc: string
  show: boolean
  onFinish?: () => void
  speed?: number // optional speed prop (default: 1.5x)
}

export function VideoLoader({ videoSrc, show, onFinish, speed = 1.5 }: VideoLoaderProps) {
  const [isVisible, setIsVisible] = useState(show)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    setIsVisible(show)
  }, [show])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
    }
  }, [speed, isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-auto">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        onEnded={() => {
          setIsVisible(false)
          onFinish?.()
        }}
        className="w-1/2 md:w-1/3 lg:w-1/4 object-contain"
      />
    </div>
  )
}
