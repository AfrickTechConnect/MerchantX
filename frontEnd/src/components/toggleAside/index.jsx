import React, { useState, useEffect } from "react"
import Proptypes from "proptypes"

import { Spin as Hamburger } from "hamburger-react"

import "./index.css"

const ToggleAside = ({ headerToggleFunc, stateChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen((currentState) => !currentState)
    headerToggleFunc()
  }

  useEffect(() => {
    setIsOpen(stateChange)
  }, [stateChange])

  return (
    <div className="toggleaside">
      <Hamburger size={20} toggled={isOpen} toggle={handleToggle} color="white" />
    </div>
  )
}

ToggleAside.propTypes = {
  headerToggleFunc: Proptypes.func.isRequired,
  stateChange: Proptypes.bool.isRequired,
}

export default ToggleAside
