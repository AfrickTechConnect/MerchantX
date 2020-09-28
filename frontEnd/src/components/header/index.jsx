import React from "react"
import { Image } from "@chakra-ui/core"
import { Link } from "react-router-dom"
import LogoUrl from "../../assets/svg/logo.svg"
import ShowMobileNav from "../sideNav"
import "./index.css"

const Header = () => {
  return (
    <header className="header__container">
      <div className="header__logo">
        <Image rounded="full" size="100px" src={LogoUrl} alt="Logo" />
      </div>
      <div className="header__mobile">
        <ShowMobileNav />
      </div>
      <div className="header__items">
        <Link to="/login">
          <div className="header__button">Login</div>
        </Link>
        <Link to="/sign up">
          <div className="header__button border-btn">sign up</div>
        </Link>
      </div>
    </header>
  )
}

export default Header
