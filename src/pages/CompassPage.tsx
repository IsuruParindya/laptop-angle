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

  const size = 300
  const cx = size / 2
  const cy = size / 2
  const r = 130

  // Generate degree markers
  const markers = Array.from({ length: 72 }, (_, i) => i * 5)

  const cardinals = [
    { label: "N", deg: 0 },
    { label: "E", deg: 90 },
    { label: "S", deg: 180 },
    { label: "W", deg: 270 },
    { label: "30", deg: 30 },
    { label: "60", deg: 60 },
    { label: "120", deg: 120 },
    { label: "150", deg: 150 },
    { label: "210", deg: 210 },
    { label: "240", deg: 240 },
    { label: "300", deg: 300 },
    { label: "330", deg: 330 },
  ]

  const toRad = (d: number) => (d * Math.PI) / 180

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">

      {/* Heading display */}
      <p className="text-white text-2xl font-light tracking-wider mb-6">
        {heading !== null
          ? `${heading}° ${getDirection(heading)}`
          : "-- °"}
      </p>

      {/* Fixed north marker */}
      <div className="w-0 h-0 mb-1" style={{
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderBottom: "10px solid #ef4444",
      }} />

      {/* Rotating compass rose */}
      <div style={{
        transform: `rotate(${-(heading ?? 0)}deg)`,
        transition: "transform 0.3s ease",
      }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Outer ring */}
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#333" strokeWidth="1" />

          {/* Degree tick marks */}
          {markers.map((deg) => {
            const rad = toRad(deg - 90)
            const isCardinal = deg % 90 === 0
            const isMajor = deg % 30 === 0
            const inner = isCardinal ? r - 16 : isMajor ? r - 12 : r - 7
            const x1 = cx + r * Math.cos(rad)
            const y1 = cy + r * Math.sin(rad)
            const x2 = cx + inner * Math.cos(rad)
            const y2 = cy + inner * Math.sin(rad)
            return (
              <line
                key={deg}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={isCardinal ? "#fff" : "#555"}
                strokeWidth={isCardinal ? 2 : 1}
              />
            )
          })}

          {/* Labels */}
          {cardinals.map(({ label, deg }) => {
            const rad = toRad(deg - 90)
            const labelR = r - 28
            const x = cx + labelR * Math.cos(rad)
            const y = cy + labelR * Math.sin(rad)
            const isCardinal = ["N", "E", "S", "W"].includes(label)
            return (
              <text
                key={label}
                x={x} y={y}
                textAnchor="middle"
                dominantBaseline="central"
                fill={label === "N" ? "#ef4444" : isCardinal ? "#fff" : "#666"}
                fontSize={isCardinal ? "18" : "10"}
                fontWeight={isCardinal ? "600" : "400"}
              >
                {label}
              </text>
            )
          })}

          {/* Center crosshair */}
          <line x1={cx - 10} y1={cy} x2={cx + 10} y2={cy} stroke="#555" strokeWidth="1" />
          <line x1={cx} y1={cy - 10} x2={cx} y2={cy + 10} stroke="#555" strokeWidth="1" />
          <circle cx={cx} cy={cy} r="3" fill="#555" />
        </svg>
      </div>

      <Link
        to="/"
        className="absolute bottom-10 text-zinc-600 text-xs tracking-widest uppercase hover:text-white transition-colors"
      >
        ← angle
      </Link>

    </div>
  )
}