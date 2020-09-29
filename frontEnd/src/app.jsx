import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import LandingPage from "./pages/Home"
import Router from "./router"
import "./index.css"

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Router />
      </Switch>
    </BrowserRouter>
  )
}

export default App
