import * as types from "../actionTypes"
import asyncRequest from "../helpers"

export const getAllPosts = () => async (dispatch) => {
  let data
  dispatch({ type: types.EXPLORE_POSTS_REQUEST })
  try {
    const response = await asyncRequest("get", `/api/v1/post/all`, null)
    const data = response.data
    dispatch({
      type: types.EXPLORE_POSTS_SUCCESS,
      data,
    })
  } catch (e) {
    data = e.response === undefined ? { status: 599, msg: "NETWORK ERROR" } : e.response.data
    dispatch({
      type: types.EXPLORE_POSTS_FAILURE,
      data,
    })
  }
}
