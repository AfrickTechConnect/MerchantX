import React, { useState, useEffect } from "react"
import { useToast } from "@chakra-ui/core"
import Input from "../../components/Input"
import Button from "../../components/button"
import Loader from "../../components/spinner"
import { createUserfollow, getUserFollows } from "../../../actions"
import fields from "./fields"
import { useHistory } from "react-router-dom"
import { connect } from "react-redux"
import "./index.css"

const Follow = ({ createFollowRequest, follow }) => {
  let history = useHistory()
  const { createdFollow, createFollowStatus, createFollowloading } = follow
  const [formFields, setFormFields] = useState({ email: "" })
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
    if (createdFollow.data) {
      toast({
        title: "",
        description: createFollowStatus.data
          ? "user followed successful"
          : `${createdFollow.data.message}`,
        status: createFollowStatus ? "success" : "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
      })
      if (createFollowStatus) {
        window.location.reload()
      }
    }
  }, [createdFollow])

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
    console.log(formFields, "this is our form fields>>>>")
    createFollowRequest(formFields.email)
  }
  const handleFormSubmit = (e) => e.preventDefault()

  return (
    <section className="signin-page">
      {createFollowloading && <Loader />}
      <div className="follower--adjust ">
        <form onSubmit={handleFormSubmit}>
          {inputFields}
          <Button
            onClick={handleSubmit}
            outline={true}
            disabled={submitDisabled}
            color="black"
            text="Follow"
          />
        </form>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  follow: state.follow,
})

const mapDispatchToProps = (dispatch) => ({
  createFollowRequest: (payload) => dispatch(createUserfollow(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Follow)
