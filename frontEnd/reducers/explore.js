import * as actionTypes from "../actionTypes"

const initialState = {
  UserPosts: {},
  loading: false,
  postsStatus: false,
}

const explore = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.EXPLORE_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        postsStatus: true,
        UserPosts: action.data,
      }
    case actionTypes.EXPLORE_POSTS_FAILURE:
      return {
        ...state,
        UserPosts: action.data,
        postsStatus: false,
        loading: false,
      }
    case actionTypes.EXPLORE_POSTS_REQUEST:
      return { ...state, loading: true, postsStatus: false }
    default:
      return state
  }
}

export default explore
