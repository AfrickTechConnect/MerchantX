import React, { useState, useEffect } from "react"
import { useToast } from "@chakra-ui/core"
import Header from "../../components/header"
import { siginUser } from "../../../actions"
import Input from "../../components/Input"
import Button from "../../components/button"
import Loader from "../../components/spinner"
import fields from "./fields"
import { connect } from "react-redux"
import setting from "../../../helpers/settings"
import "./index.css"

const Login = ({ loginRequest }) => {
  const [formFields, setFormFields] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const requiredFields = fields.filter(({ require }) => require).map(({ name }) => name)
  const toast = useToast()
  console.log(formFields, "our form fields>>>>")
  console.log(errors, "our form errors>>>>")
  console.log(submitDisabled, "our submit forms>>>>")
  const callToast = (status, description) => {
    toast({
      ...setting,
      title: status === "success" ? "" : "Login Error",
      description: `${status === "success" ? "" : "Error message"} ${description}`,
      status,
    })
  }
  const clearErrors = (newErrorState) => {
    const errorObj = {}

    Object.keys(newErrorState).forEach((item) => {
      if (newErrorState[item].trim() !== "") {
        errorObj[item] = newErrorState[item]
      }
    })
    return errorObj
  }

  const checkRequired = () => {
    const requiredFieldsError = {}

    Object.keys(formFields).forEach((item) => {
      if (formFields[item].trim() === "" && requiredFields.includes(item)) {
        requiredFieldsError[item] = `${item} is required`
      } else {
        requiredFieldsError[item] = ""
      }
    })
    return requiredFieldsError
  }

  useEffect(() => {
    const requiredResponse = checkRequired()
    setErrors((currentState) =>
      clearErrors({
        ...currentState,
        ...requiredResponse,
      })
    )
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length) setSubmitDisabled(true)
    else setSubmitDisabled(false)
  }, [errors])
  /*useEffect(() => {
    if (stateError && Object.keys(stateError).length) {
      const errorVal = typeof stateError === "string" ? stateError : Object.values(stateError)[0]

      callToast("error", errorVal)
    }
  }, [stateError])*/

  const collectInputError = (elemName, error) => {
    setErrors((currentState) =>
      clearErrors({
        ...currentState,
        [elemName]: error,
      })
    )
  }

  const inputChange = (name, value) => {
    setFormFields((currentState) => ({
      ...currentState,
      [name]: value,
    }))
  }

  const inputFields = fields.map((item) => (
    <Input
      key={item.name}
      category={item.category}
      onKeyUp={inputChange}
      name={item.name}
      submitError={collectInputError}
      placeholder={item.placeholder}
      label={item.label}
      validation={item.validation}
    />
  ))

  const handleSubmit = () => {
    loginRequest({ ...formFields })
  }
  const handleFormSubmit = (e) => e.preventDefault()

  return (
    <section className="signin-page">
      <Loader />
      <Header />
      <div className="signin-page__container">
        <form onSubmit={handleFormSubmit}>
          {inputFields}
          <Button
            onClick={handleSubmit}
            outline={true}
            disabled={submitDisabled}
            color="black"
            text="Sign In"
          />
        </form>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  signin: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  loginRequest: (payload) => dispatch(siginUser(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
