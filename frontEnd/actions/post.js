import * as types from "../actionTypes"
import asyncRequest from "../helpers"

export const getUserPosts = () => async (dispatch) => {
  let data
  dispatch({ type: types.FETCH_USER_POSTS_REQUEST })
  try {
    const response = await asyncRequest("get", `/api/v1/post`, null)
    const data = response.data
    dispatch({
      type: types.FETCH_USER_POSTS_SUCCESS,
      data,
    })
  } catch (e) {
    data = e.response === undefined ? { status: 599, msg: "NETWORK ERROR" } : e.response.data
    dispatch({
      type: types.FETCH_USER_POSTS_FAILURE,
      data,
    })
  }
}

export const createUserPosts = (details) => async (dispatch) => {
  let data
  dispatch({ type: types.CREATE_USER_POSTS_REQUEST })
  try {
    const response = await asyncRequest("post", `/api/v1/post`, details)
    const data = response.data
    dispatch({
      type: types.CREATE_USER_POSTS_SUCCESS,
      data,
    })
  } catch (e) {
    data = e.response === undefined ? { status: 599, msg: "NETWORK ERROR" } : e.response.data
    dispatch({
      type: types.CREATE_USER_POSTS_FAILURE,
      data,
    })
  }
}

export const clearUserPosts = (details) => async (dispatch) => {
  let data
  dispatch({ type: types.CLEAR_USER_POSTS })
}
