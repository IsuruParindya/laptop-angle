import { useDeviceAngle } from "./useDeviceAngle"

export default function App() {
  const angle = useDeviceAngle()

  return (
    <div>
      <p>Angle: {angle !== null ? `${angle}°` : "No data"}</p>
    </div>
  )
}