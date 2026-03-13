import { useDeviceAngle } from "../useDeviceAngle"
import { Link } from "react-router-dom"

export default function AnglePage() {
  const angle = useDeviceAngle()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative">

      {/* Top label */}
      <p className="text-zinc-500 text-xs tracking-widest uppercase mb-2">
        Lid Angle Sensor
      </p>

      {/* Big number */}
      <p className="text-[#39ff14] font-bold leading-none"
        style={{ fontSize: "20vw" }}>
        {angle !== null ? `${angle}` : "--"}
        <span style={{ fontSize: "10vw" }}>°</span>
      </p>

      {/* Status label */}
      <p className="text-zinc-500 text-xs tracking-widest uppercase mt-4">
        {angle === null ? "no data" :
         angle < 20 ? "lid closed" :
         angle < 60 ? "barely open" :
         angle < 120 ? "normal use" :
         angle < 160 ? "wide open" :
         "fully back"}
      </p>

      {/* Link to compass */}
      <Link
        to="/compass"
        className="absolute bottom-10 text-zinc-600 text-xs tracking-widest uppercase hover:text-white transition-colors"
      >
        compass →
      </Link>

    </div>
  )
}