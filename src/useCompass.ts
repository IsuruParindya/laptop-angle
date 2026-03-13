import { useState, useEffect } from "react"

export function useCompass() {
  const [heading, setHeading] = useState<number | null>(null)

  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      // alpha = compass heading (0-360)
      if (e.alpha !== null) {
        setHeading(Math.round(e.alpha))
      }
    }

    window.addEventListener("deviceorientation", handler)
    return () => window.removeEventListener("deviceorientation", handler)
  }, [])

  return heading
}