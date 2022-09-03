import { Provider } from 'react-redux';
import { Outlet } from 'react-router-dom';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'

import BottomBar from './components/Bar/BottomBar';
import TopBar from './components/Bar/TopBar';
import { store } from './store/store';

import { theme } from './style/theme';

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
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Normalize />
        <GlobalStyle />
        <TopBar />
        <Wrapper><Outlet /></Wrapper>
        <BottomBar />
      </ThemeProvider>
    </Provider>
  )
}

export default App;
