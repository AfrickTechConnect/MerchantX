import React, { useState, useEffect } from "react"
import { useToast } from "@chakra-ui/core"
import Header from "../../components/header"
import { siginUser } from "../../../actions"
import Input from "../../components/Input"
import Button from "../../components/button"
import Loader from "../../components/spinner"
import { useHistory } from "react-router-dom"
import fields from "./fields"
import { connect } from "react-redux"
import "./index.css"

const Login = ({ loginRequest, signin }) => {
  let history = useHistory()
  const { loading, UserData, isSignedIn } = signin
  const [formFields, setFormFields] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const requiredFields = fields.filter(({ require }) => require).map(({ name }) => name)
  const toast = useToast()
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
    if (UserData.message) {
      toast({
        title: "",
        description: UserData.data ? "login successful" : `${UserData.message}`,
        status: UserData.data ? "success" : "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
      })
      if (isSignedIn) {
        history.push("/")
        localStorage.setItem("token", UserData.data.token)
      }
    }
  }, [UserData])

  useEffect(() => {
    if (Object.keys(errors).length) setSubmitDisabled(true)
    else setSubmitDisabled(false)
  }, [errors])

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
      {loading && <Loader />}
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
