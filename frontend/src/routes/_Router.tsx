import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./Home"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router