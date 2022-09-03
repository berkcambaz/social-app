import { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'

import BottomBar from './components/Bar/BottomBar';
import TopBar from './components/Bar/TopBar';

import Router from "./routes/_Router";

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

function App() {
  return (
    <>
      <Normalize />
      <GlobalStyle />
      <TopBar />
      <Router />
      <BottomBar />
    </>
  )
}

export default App;
