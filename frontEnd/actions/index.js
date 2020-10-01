import * as user from "./user"
import * as post from "./post"
import * as follow from "./follow"
import * as explore from "./explore"
const { siginUser, sigupUser, getUserDetails } = user
const { getUserPosts, createUserPosts, clearUserPosts } = post
const { createUserfollow, getUserFollows, getUserFollowers } = follow
const { getAllPosts } = explore
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
  getAllPosts,
}
