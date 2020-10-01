import * as actionTypes from "../actionTypes"

const initialState = {
  allfollows: {},
  loading: false,
  followsStatus: false,
  createdFollow: {},
  createFollowStatus: false,
  createFollowloading: false,
}

const user = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_FOLLOW_REQUEST:
      return {
        ...state,
        createFollowloading: false,
        createFollowStatus: false,
      }
    case actionTypes.CREATE_USER_FOLLOW_SUCCESS:
      return {
        ...state,
        createFollowloading: false,
        createdFollow: action.data,
        createFollowStatus: true,
      }
    case actionTypes.CREATE_USER_FOLLOW_FAILURE:
      return {
        ...state,
        createFollowStatus: false,
        createFollowloading: false,
        createdFollow: action.data,
      }
    case actionTypes.GET_USER_FOLLOW_REQUEST:
      return {
        ...state,
        loading: false,
        followsStatus: false,
      }
    case actionTypes.GET_USER_FOLLOW_FAILURE:
      return {
        ...state,
        createFollowloading: false,
        loading: action.data,
        followsStatus: false,
      }
    case actionTypes.GET_USER_FOLLOW_SUCCESS:
      return {
        ...state,
        followsStatus: true,
        loading: false,
        allfollows: action.data,
      }
    default:
      return state
  }
}

export default user
