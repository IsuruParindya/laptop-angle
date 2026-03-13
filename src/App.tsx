import { BrowserRouter, Routes, Route } from "react-router-dom"
import AnglePage from "./pages/AnglePage"
import CompassPage from "./pages/CompassPage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AnglePage />} />
        <Route path="/compass" element={<CompassPage />} />
      </Routes>
    </BrowserRouter>
  )
}