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
    data = e.response === undefined ? { status: 599, msg: "NETWORK ERROR" } : e.response.data
    dispatch({
      type: types.CREATE_USER_FOLLOW_FAILURE,
      data,
    })
  }
}

export const getUserFollows = (value) => async (dispatch) => {
  let data
  dispatch({ type: types.GET_USER_FOLLOW_REQUEST })
  try {
    const response = await asyncRequest("get", `/api/v1/follow/followings/?sort=${value}`, null)
    const data = response.data
    dispatch({
      type: types.GET_USER_FOLLOW_SUCCESS,
      data,
    })
  } catch (e) {
    dispatch({
      type: types.GET_USER_FOLLOW_FAILURE,
      data,
    })
  }
}

export const getUserFollowers = (value) => async (dispatch) => {
  let data
  dispatch({ type: types.GET_USER_FOLLOWER_REQUEST })
  try {
    console.log(value, "values to be dispatched")
    const response = await asyncRequest("get", `/api/v1/follow/followers/?sort=${value}`, null)
    const data = response.data
    dispatch({
      type: types.GET_USER_FOLLOWER_SUCCESS,
      data,
    })
  } catch (e) {
    dispatch({
      type: types.GET_USER_FOLLOWER_FAILURE,
      data,
    })
  }
}
