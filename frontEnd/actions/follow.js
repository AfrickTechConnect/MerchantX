import * as types from "../actionTypes"
import asyncRequest from "../helpers"

export const createUserfollow = (email) => async (dispatch) => {
  let data
  dispatch({ type: types.CREATE_USER_FOLLOW_REQUEST })
  try {
    const response = await asyncRequest("post", `/api/v1/follow/${email}`, null)
    const data = response.data
    dispatch({
      type: types.CREATE_USER_FOLLOW_SUCCESS,
      data,
    })
  } catch (e) {
    data = e.response === undefined ? { status: 599, message: "NETWORK ERROR" } : e.response.data
    dispatch({
      type: types.CREATE_USER_FOLLOW_FAILURE,
      data,
    })
  }
}

export const getUserFollows = () => async (dispatch) => {
  let data
  dispatch({ type: types.GET_USER_FOLLOW_REQUEST })
  try {
    const response = await asyncRequest("get", `/api/v1/follow/followers`, null)
    const data = response.data
    dispatch({
      type: types.GET_USER_FOLLOW_SUCCESS,
      data,
    })
  } catch (e) {
    data = e.response === undefined ? { status: 599, message: "NETWORK ERROR" } : e.response.data
    dispatch({
      type: types.GET_USER_FOLLOW_FAILURE,
      data,
    })
  }
}
