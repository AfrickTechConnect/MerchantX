import * as actionTypes from "../actionTypes"

const initialState = {
  allfollows: {},
  loading: false,
  followsStatus: false,
  allfollowers: {},
  isloadingFollower: false,
  followersStatus: false,
  createdFollow: {},
  createFollowStatus: false,
  createFollowloading: false,
}

const follow = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.CREATE_USER_FOLLOW_REQUEST:
      return {
        ...state,
        createFollowloading: true,
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
        loading: true,
        followsStatus: false,
      }
    case actionTypes.GET_USER_FOLLOW_FAILURE:
      return {
        ...state,
        loading: false,
        allfollows: action.data,
        followsStatus: false,
      }
    case actionTypes.GET_USER_FOLLOW_SUCCESS:
      return {
        ...state,
        followsStatus: true,
        loading: false,
        allfollows: action.data,
      }

    case actionTypes.GET_USER_FOLLOWER_REQUEST:
      return {
        ...state,
        isloadingFollower: true,
        followersStatus: false,
      }
    case actionTypes.GET_USER_FOLLOWER_FAILURE:
      return {
        ...state,
        isloadingFollower: false,
        allfollowers: action.data,
        followersStatus: false,
      }
    case actionTypes.GET_USER_FOLLOWER_SUCCESS:
      return {
        ...state,
        followersStatus: true,
        isloadingFollower: false,
        allfollowers: action.data,
      }

    default:
      return state
  }
}

export default follow
