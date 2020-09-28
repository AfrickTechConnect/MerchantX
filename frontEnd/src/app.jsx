import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LandingPage from "./pages/Home"
import "./index.css"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
