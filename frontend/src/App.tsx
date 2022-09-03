import { createGlobalStyle } from 'styled-components'
import { Normalize } from 'styled-normalize'

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
      <Router />
    </>
  )
}

export default App;
