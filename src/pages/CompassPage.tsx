import { useCompass } from "../useCompass"
import { Link } from "react-router-dom"

export default function CompassPage() {
  const heading = useCompass()

  const getDirection = (deg: number) => {
    if (deg < 22.5 || deg >= 337.5) return "N"
    if (deg < 67.5) return "NE"
    if (deg < 112.5) return "E"
    if (deg < 157.5) return "SE"
    if (deg < 202.5) return "S"
    if (deg < 247.5) return "SW"
    if (deg < 292.5) return "W"
    return "NW"
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">

      {/* Top label */}
      <p className="text-zinc-500 text-xs tracking-widest uppercase mb-8">
        Compass
      </p>

      {/* Compass needle */}
      <div
        className="w-48 h-48 rounded-full border border-zinc-800 flex items-center justify-center mb-8 relative"
        style={{ transition: "transform 0.2s ease" }}
      >
        {/* Rotating needle */}
        <div
          className="absolute w-1 h-20 rounded-full origin-bottom"
          style={{
            background: "linear-gradient(to top, #39ff14, transparent)",
            bottom: "50%",
            left: "calc(50% - 2px)",
            transformOrigin: "bottom center",
            transform: `rotate(${heading ?? 0}deg)`,
            transition: "transform 0.3s ease",
          }}
        />
        <div className="w-2 h-2 rounded-full bg-[#39ff14] z-10" />
      </div>

      {/* Heading number */}
      <p className="text-[#39ff14] font-bold leading-none"
        style={{ fontSize: "20vw" }}>
        {heading !== null ? heading : "--"}
        <span style={{ fontSize: "10vw" }}>°</span>
      </p>

      {/* Direction label */}
      <p className="text-zinc-500 text-xs tracking-widest uppercase mt-4">
        {heading !== null ? getDirection(heading) : "no data"}
      </p>

      {/* Back link */}
      <Link
        to="/"
        className="absolute bottom-10 text-zinc-600 text-xs tracking-widest uppercase hover:text-white transition-colors"
      >
        ← angle
      </Link>

    </div>
  )
}