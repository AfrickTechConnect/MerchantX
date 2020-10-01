import { combineReducers } from "redux"
import user from "./user"
import post from "./post"
import follow from "./follow"
import explore from "./explore"

export default combineReducers({
  user,
  post,
  follow,
  explore,
})
