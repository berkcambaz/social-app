import { BrowserRouter, Routes, Route, Navigate, Outlet, useRoutes } from "react-router-dom"

import React, { Suspense } from "react"
import Spinner from "../components/Util/Spinner";
import styled from "styled-components";

const App = React.lazy(() => import("../App"));
const Home = React.lazy(() => import("./Home"));
const User = React.lazy(() => import("./User"));
const Search = React.lazy(() => import("./Search"));
const NotFound = React.lazy(() => import("./NotFound"));
const Followers = React.lazy(() => import("./Followers"));
const Followings = React.lazy(() => import("./Followings"));
const Menu = React.lazy(() => import("./Menu"));
const Login = React.lazy(() => import("./Login"));
const Signup = React.lazy(() => import("./Signup"));
const Bookmarks = React.lazy(() => import("./Bookmarks"));
const Account = React.lazy(() => import("./Account"));
const Languages = React.lazy(() => import("./Languages"));
const About = React.lazy(() => import("./About"));

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`

function Router() {
  return (
    <Suspense fallback={<StyledSpinner />}>
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
    </Suspense>
  )
}

export default Router