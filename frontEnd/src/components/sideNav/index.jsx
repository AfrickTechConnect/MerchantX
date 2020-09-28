import React from "react"
import { Link } from "react-router-dom"
import "./index.css"

const showMobileNav = (props) => {
  return (
    <div className="headers">
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" htmlFor="menu-btn">
        <span className="navicon" />
      </label>
      <ul className="menu">
        <li>
          <Link to="/terms">Sign In</Link>
        </li>
        <li>
          <Link to="/terms">Sign Up</Link>
        </li>
      </ul>
    </div>
  )
}

export default showMobileNav
