import * as actionTypes from "../actionTypes"

const initialState = {
  UserData: {},
  AllUsersData: {},
  isSignedIn: false,
  isSignedUp: false,
  loading: false,
  allUserloading: false,
  allUsersDataSucess: false,
  isAuth: false,
  authenticating: false,
}

const user = (state = { ...initialState }, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isSignedIn: true,
        UserData: action.data,
      }
    case actionTypes.USER_SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        isSignedIn: false,
        UserData: action.data,
      }
    case actionTypes.USER_SIGNIN_REQUEST:
      return { ...state, loading: true, isSignedIn: false }
    case actionTypes.USER_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        isSignedUp: false,
        UserData: action.data,
      }
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        isSignedUp: true,
        UserData: action.data,
      }
    case actionTypes.USER_SIGNUP_REQUEST:
      return { ...state, loading: true, isSignedUp: false }

    case actionTypes.FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        isAuth: false,
        UserData: action.data,
        authenticating: false,
      }
    case actionTypes.FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        isAuth: true,
        UserData: action.data,
        authenticating: false,
      }
    case actionTypes.FETCH_USER_DETAILS_REQUEST:
      return { ...state, isAuth: false, authenticating: true }
    default:
      return state
  }
}

export default user
