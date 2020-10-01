import React, { useState, useEffect } from "react"
import { useToast } from "@chakra-ui/core"
import Header from "../../components/header"
import { createUserPosts, clearUserPosts } from "../../../actions"
import Input from "../../components/Input"
import TextArea from "../../components/textarea"
import Button from "../../components/button"
import Loader from "../../components/spinner"
import { useHistory } from "react-router-dom"
import fields from "./fields"
import { connect } from "react-redux"

const CreatePost = ({ createPostRequest, clearUserPosts, post }) => {
  let history = useHistory()
  const { createdPost, createPostStatus, createPostloading } = post
  const [formFields, setFormFields] = useState({ title: "", description: "" })
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
    if (createdPost.message) {
      toast({
        title: "",
        description: createdPost.data ? "post created successful" : `${createdPost.message}`,
        status: createdPost.data ? "success" : "warning",
        duration: 9000,
        isClosable: true,
        position: "top",
      })
      if (createPostStatus) {
        clearUserPosts()
        history.push("/")
      }
    }
  }, [createdPost])

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

  const inputFields = fields.map((item) =>
    item.type === "input" ? (
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
    ) : (
      <TextArea
        key={item.name}
        name={item.name}
        label={item.label}
        placeholder={item.placeholder}
        validation={item.validation}
        submitError={collectInputError}
        onChange={inputChange}
      />
    )
  )

  const handleSubmit = () => {
    createPostRequest({ ...formFields })
  }
  const handleFormSubmit = (e) => e.preventDefault()

  return (
    <section className="signin-page">
      {createPostloading && <Loader />}
      <div className="signin-page__container">
        <form onSubmit={handleFormSubmit}>
          {inputFields}
          <Button
            onClick={handleSubmit}
            outline={true}
            disabled={submitDisabled}
            color="black"
            text="Create Post"
          />
        </form>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  post: state.post,
})

const mapDispatchToProps = (dispatch) => ({
  createPostRequest: (payload) => dispatch(createUserPosts(payload)),
  clearUserPosts: () => dispatch(clearUserPosts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)
