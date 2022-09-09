import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"

import App from "../App"
import Home from "./Home"
import User from "./User"
import Search from "./Search"
import NotFound from "./NotFound"
import Followers from "./Followers"
import Followings from "./Followings"
import Menu from "./Menu"
import Login from "./Login"
import Signup from "./Signup"
import Bookmarks from "./Bookmarks"
import Account from "./Account"
import Languages from "./Languages"
import About from "./About"

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Navigate to="home" />} />

          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />

          <Route path="home" element={<Home />} />
          <Route path="search" element={<Search />} />

          <Route path="user/:tag" element={<User />} />
          <Route path="user/:tag/followings" element={<Followings />} />
          <Route path="user/:tag/followers" element={<Followers />} />
          
          <Route path="menu" element={<Menu />} />
          <Route path="account" element={<Account />} />
          <Route path="bookmarks" element={<Bookmarks />} />
          <Route path="languages" element={<Languages />} />
          <Route path="about" element={<About />} />

          <Route path="404" element={<NotFound />} />

          <Route path="*" element={<Navigate to="404" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router