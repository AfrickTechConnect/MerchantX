import React from "react"
import { Box } from "@chakra-ui/core"
import Header from "../../components/header"
import Hero from "../../components/hero"
import "./index.css"

const Home = () => {
  return (
    <div className="home">
      <Header />
      <Hero />
    </div>
  )
}

export default Home
