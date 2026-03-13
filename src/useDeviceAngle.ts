import { useState, useEffect } from "react"

export function useDeviceAngle() {
  const [angle, setAngle] = useState<number | null>(null)

  useEffect(() => {
    const handler = (e: DeviceOrientationEvent) => {
      if (e.beta !== null) {
        const lidAngle = Math.round(e.beta + 90)
        setAngle(Math.max(0, Math.min(180, lidAngle)))
      }
    }

    window.addEventListener("deviceorientation", handler)
    return () => window.removeEventListener("deviceorientation", handler)
  }, [])

  return angle
}