import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import App from "../App"
import Home from "./Home"
import NotFound from "./NotFound"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="home" />} />
          
          <Route path="home" element={<Home />} />
          <Route path="404" element={<NotFound />} />

          <Route path="*" element={<Navigate to="404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router