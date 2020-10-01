import * as actionTypes from "../actionTypes"

const initialState = {
  UserPosts: {},
  loading: false,
  postsStatus: false,
  createdPost: {},
  createPostStatus: false,
  createPostloading: false,
}

const post = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        postsStatus: true,
        UserPosts: action.data,
      }
    case actionTypes.FETCH_USER_POSTS_FAILURE:
      return {
        ...state,
        UserPosts: action.data,
        postsStatus: false,
        loading: false,
      }
    case actionTypes.FETCH_USER_POSTS_REQUEST:
      return { ...state, loading: true, postsStatus: false }
    case actionTypes.CREATE_USER_POSTS_SUCCESS:
      return {
        ...state,
        createPostloading: false,
        createPostStatus: true,
        createdPost: action.data,
      }
    case actionTypes.CREATE_USER_POSTS_FAILURE:
      return {
        ...state,
        createdPost: action.data,
        createPostStatus: false,
        createPostloading: false,
      }
    case actionTypes.CREATE_USER_POSTS_REQUEST:
      return { ...state, createPostloading: true, createPostStatus: false }
    case actionTypes.CLEAR_USER_POSTS:
      return { ...state, createdPost: {}, createPostloading: false, createPostStatus: false }
    default:
      return state
  }
}

export default post
