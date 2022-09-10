import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'

import BottomBar from './components/Bar/BottomBar';
import TopBar from './components/Bar/TopBar';
import Spinner from './components/Util/Spinner';
import { useAuthMutation } from './store/apis/authApi';
import { useAppSelector } from './store/hooks';

const GlobalStyle = createGlobalStyle`
  body {
    overflow-y: scroll;

    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;

    // Disable highlight on mobile's when clicking
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  * {
    box-sizing: border-box;
  }
`

const Wrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

function App() {
  const [ready, setReady] = useState(false);

  const [auth, result] = useAuthMutation();

  const navigate = useNavigate();
  const route = useAppSelector((state) => state.app.routeProperties);
  const user = useAppSelector((state) => state.app.userId);


  useLayoutEffect(() => { auth({}) }, [])

  useLayoutEffect(() => {
    if (result.isError || result.isSuccess) setReady(true);
  }, [result.status])

  useLayoutEffect(() => {
    if (route.name === "") return;

    if (route.forAny) return;
    if (user !== undefined && route.forGuests) navigate("/home", { replace: true });
    if (user === undefined && !route.forGuests) navigate("/login", { replace: true });
  }, [user, route])


  if (!ready) return null;

  return (
    <>
      <Normalize />
      <GlobalStyle />
      <TopBar />
      <Wrapper>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </Wrapper>
      <BottomBar />
    </>
  )
}

export default App;
