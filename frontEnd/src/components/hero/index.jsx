import React from "react"
import Hero1Logo from "../../assets/svg/hero1.svg"
import Hero2Logo from "../../assets/svg/hero2.svg"
import Hero3Logo from "../../assets/svg/hero3.svg"
import Hero4Logo from "../../assets/svg/hero4.svg"
import { Link } from "react-router-dom"
import "./index.css"

const Hero = () => {
  return (
    <section className="hero__container">
      <div className="hero__caption">
        CONNECT WITH FRIENDS
        <p>LIKE NEVER BEFORE</p>
        <Link to="/login">
          <button className="hero__button">GET STARTED</button>
        </Link>
      </div>
      <div className="hero__gallery">
        <img src={Hero2Logo} alt="Logo" />
        <img src={Hero1Logo} alt="Logo" />
        <img src={Hero3Logo} alt="Logo" />
        <img src={Hero4Logo} alt="Logo" />
      </div>
    </section>
  )
}

export default Hero
