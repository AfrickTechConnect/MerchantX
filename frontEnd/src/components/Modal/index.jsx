import React from "react"
import FontAwesome from "react-fontawesome"
import PropTypes from "prop-types"
import "./index.css"

const modal = (props) => {
  const { closeModal } = props

  const closeicon = () => (
    <FontAwesome
      name="times"
      onClick={closeModal}
      style={{
        color: "#000000",
        padding: "10px",
        cursor: "pointer",
        backgroundColor: "transparent",
        border: 0,
        position: "absolute",
        top: "0.3rem",
        right: "0.5rem",
      }}
    />
  )

  return (
    <div className="overlay">
      <div className="content">
        {closeicon()}
        {props.children}
      </div>
    </div>
  )
}

modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
}

export default modal
