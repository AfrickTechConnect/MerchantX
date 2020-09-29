import React, { useState, useEffect } from "react"
import Proptypes from "prop-types"

import { Input } from "@chakra-ui/core"

import "./index.css"

const defaultStyles = {
  fontSize: "normal",
  backgroundColor: "#F1F1F1",
  height: "5rem",
  borderRadius: "var(--button-border-radius)",
  fontSize: "1.5rem",
  padding: "1rem",
  fontFamily: "inherit",
}

const input = ({ submitError, name, label, category, placeholder, onKeyUp, validation }) => {
  const [errors, setErrors] = useState([])
  const validate = (inputValue) => {
    const errMsg = []

    validation.forEach(({ testCase, message }) => {
      if (!testCase(inputValue)) errMsg.push(message)
    })

    return errMsg
  }

  useEffect(() => {
    submitError(name, errors[0] || "")
  }, [errors])

  const handleKeyUp = (e) => {
    const {
      target: { value, name },
    } = e
    onKeyUp(name, value)

    if (validation) {
      const errorRes = validate(value)

      setErrors(errorRes)
    }
  }

  return (
    <div className="input__input-block">
      <label className="input-label">{label}</label>
      <Input
        onChange={handleKeyUp}
        isInvalid={Boolean(errors.length)}
        type={category}
        name={name}
        className="input-input"
        style={defaultStyles}
        placeholder={placeholder}
        border={0}
      />
      <span className="input__error">{errors[0]}</span>
    </div>
  )
}

input.propTypes = {
  submitError: Proptypes.func,
  onKeyUp: Proptypes.func,
  name: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  category: Proptypes.string.isRequired,
  placeholder: Proptypes.string.isRequired,
  validation: Proptypes.array,
}

input.defaultProps = {
  submitError: () => {},
  onKeyUp: () => {},
  validation: null,
}

export default input
