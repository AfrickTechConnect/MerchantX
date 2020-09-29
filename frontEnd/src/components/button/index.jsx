import React from "react"

import Proptypes from "prop-types"

import "./index.css"

const button = ({ text, color, style, icon, outline, disabled, onClick, classname }) => {
  const setStyle = (outline) => {
    return outline
      ? {
          border: `0.2rem solid ${color}`,
          backgroundColor: "#FFFFFF",
          color,
        }
      : {
          backgroundColor: color,
          color: "#FFFFFF",
          borderStyle: "none",
        }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={style || setStyle(outline)}
      className={`button-container ${classname}`}
    >
      {icon && <img className="button-container-icon" src={icon}></img>}
      {text}
    </button>
  )
}

button.propTypes = {
  onClick: Proptypes.func,
  text: Proptypes.string.isRequired,
  color: Proptypes.string,
  outline: Proptypes.bool,
  disabled: Proptypes.bool,
  style: Proptypes.shape({}),
  icon: Proptypes.node,
  classname: Proptypes.string,
}

button.defaultProps = {
  onClick: () => {},
  classname: "",
  color: "var(--amber)",
  disabled: false,
  outline: false,
  style: null,
  icon: null,
}

export default button
