import { combineReducers } from "redux"
import user from "./user"
import post from "./post"
import follow from "./follow"

export default combineReducers({
  user,
  post,
  follow,
})
