import * as user from "./user"
import * as post from "./post"
import * as follow from "./follow"
const { siginUser, sigupUser, getUserDetails } = user
const { getUserPosts, createUserPosts, clearUserPosts } = post
const { createUserfollow, getUserFollows, getUserFollowers } = follow

export {
  siginUser,
  sigupUser,
  getUserDetails,
  getUserPosts,
  createUserPosts,
  getUserFollows,
  createUserfollow,
  getUserFollowers,
  clearUserPosts,
}
