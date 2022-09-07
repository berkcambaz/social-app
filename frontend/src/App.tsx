import { Outlet, useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle} from 'styled-components'
import { Normalize } from 'styled-normalize'

import BottomBar from './components/Bar/BottomBar';
import TopBar from './components/Bar/TopBar';
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
  const navigate = useNavigate();
  const route = useAppSelector((state) => state.app.routeProperties);
  const user = useAppSelector((state) => state.app.userId);

  if (user !== undefined && route.forGuests) navigate("/home", { replace: true });
  if (user === undefined && !route.forGuests) navigate("/login", { replace: true });

  return (
    <>
      <Normalize />
      <GlobalStyle />
      <TopBar />
      <Wrapper><Outlet /></Wrapper>
      <BottomBar />
    </>
  )
}

export default App;
