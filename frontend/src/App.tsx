import { Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'

import BottomBar from './components/Bar/BottomBar';
import TopBar from './components/Bar/TopBar';
import Spinner from './components/Util/Spinner';
import { useAppStore } from './store/appStore';
import { useUserStore } from './store/userStore';

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

const StyledSpinner = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
`

function App() {
  const [ready, setReady] = useState(false);

  const auth = useUserStore(state => state.auth);

  const navigate = useNavigate();
  const route = useAppStore((state) => state.route)
  const user = useUserStore((state) => state.current);

  useEffect(() => {
    (async () => {
      await auth();
      setReady(true);
    })()
  }, [])

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
        <Suspense fallback={<StyledSpinner />}>
          <Outlet />
        </Suspense>
      </Wrapper>
      <BottomBar />
    </>
  )
}

export default App;
