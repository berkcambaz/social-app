import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import App from "../App"
import Home from "./Home"
import User from "./User"
import Search from "./Search"
import NotFound from "./NotFound"
import Followers from "./Followers"
import Followings from "./Followings"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="home" />} />
          
          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="user" element={<User />} />
          <Route path="followings" element={<Followings />} />
          <Route path="followers" element={<Followers />} />
          <Route path="404" element={<NotFound />} />

          <Route path="*" element={<Navigate to="404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router