import React, { useState, useEffect } from "react"
import Proptypes from "prop-types"

import { Textarea } from "@chakra-ui/core"

import "./index.css"

const defaultStyles = {
  fontSize: "normal",
  backgroundColor: "#F1F1F1",
  height: "5rem",
  borderRadius: "var(--button-border-radius)",
  fontSize: "1.5rem",
  padding: "1rem",
  fontFamily: "CircularStdBook",
}

const textArea = ({ name, label, placeholder, onChange, submitError, validation }) => {
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

  const handleChange = (e) => {
    const {
      target: { value, name },
    } = e

    onChange(name, value)

    if (validation) {
      const errorRes = validate(value)

      setErrors(errorRes)
    }
  }

  return (
    <div className="text-area-container">
      <label className="text-area-container-label">{label}</label>
      <Textarea
        isInvalid={Boolean(errors.length)}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className="text-area-container-input"
        style={defaultStyles}
        border={0}
      />
      <span className="text-area-container__error">{errors[0]}</span>
    </div>
  )
}

textArea.propTypes = {
  submitError: Proptypes.func,
  onChange: Proptypes.func,
  name: Proptypes.string.isRequired,
  label: Proptypes.string.isRequired,
  placeholder: Proptypes.string.isRequired,
  validation: Proptypes.array,
}

textArea.defaultProps = {
  submitError: () => {},
  onChange: () => {},
  validation: null,
}

export default textArea
