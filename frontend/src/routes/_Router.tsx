import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./Home"
import NotFound from "./NotFound"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router