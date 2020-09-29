import React from "react"
import { Route, Switch } from "react-router-dom"
import Auth from "./pages/auth"
import NotFound from "./components/NotFound"
import Home from "./pages/Home"
import Dashboard from "./pages/DashBoard"
import Login from "./pages/login"
import Signup from "./pages/signup"
import ProtectedRoute from "./components/protectedRoute"

const Router = () => (
  <Switch>
    <Route path="/" exact component={Auth} />
    <Route path="/home" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route path="/signup" exact component={Signup} />
    <ProtectedRoute path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
)
export default Router
