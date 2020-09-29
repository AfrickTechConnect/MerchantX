import React from "react"
import ReactDOM from "react-dom"
import { ThemeProvider, CSSReset } from "@chakra-ui/core"
import App from "./App"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { theme } from "@chakra-ui/core"
import Rootreducer from "../reducers"
import { composeWithDevTools } from "redux-devtools-extension"
import { Provider } from "react-redux"

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
}

const middleware = [thunk]
const store = createStore(Rootreducer, composeWithDevTools(applyMiddleware(...middleware)))

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
)
