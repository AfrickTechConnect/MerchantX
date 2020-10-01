import * as user from "./user"
import * as post from "./post"
import * as follow from "./follow"
const { siginUser, sigupUser, getUserDetails } = user
const { getUserPosts, createUserPosts } = post
const { createUserfollow, getUserFollows } = follow

export {
  siginUser,
  sigupUser,
  getUserDetails,
  getUserPosts,
  createUserPosts,
  getUserFollows,
  createUserfollow,
}
