import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import React from "react"
import { useWait } from "../components/Util/Spinner";
import App from "../App";

const Home = React.lazy(useWait(() => import("./Home")));
const User = React.lazy(useWait(() => import("./User")));
const Search = React.lazy(useWait(() => import("./Search")));
const NotFound = React.lazy(useWait(() => import("./NotFound")));
const Followers = React.lazy(useWait(() => import("./Followers")));
const Followings = React.lazy(useWait(() => import("./Followings")));
const Menu = React.lazy(useWait(() => import("./Menu")));
const Login = React.lazy(useWait(() => import("./Login")));
const Signup = React.lazy(useWait(() => import("./Signup")));
const Bookmarks = React.lazy(useWait(() => import("./Bookmarks")));
const Account = React.lazy(useWait(() => import("./Account")));
const Languages = React.lazy(useWait(() => import("./Languages")));
const About = React.lazy(useWait(() => import("./About")));

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