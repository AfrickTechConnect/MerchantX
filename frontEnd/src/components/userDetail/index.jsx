import React, { useState, Fragment } from "react"
import Navbar from "../Navbar"
import Post from "../../pages/allpost"
import Follow from "../../components/addFriend"
import "./index.css"

const UserDetails = ({ firstname, email, lastname, followingsCount, followersCount }) => {
  const [post, setPost] = useState(true)
  const [following, setFollowing] = useState(false)
  const [follower, setFollower] = useState(false)
  const [follow, setFollow] = useState(false)

  const postClick = () => {
    setPost(true)
    setFollowing(false)
    setFollower(false)
    setFollow(false)
  }

  const followingClick = () => {
    setPost(false)
    setFollowing(true)
    setFollower(false)
    setFollow(false)
  }

  const followerClick = () => {
    setPost(false)
    setFollowing(false)
    setFollower(true)
    setFollow(false)
  }

  const followClick = () => {
    setPost(false)
    setFollowing(false)
    setFollower(false)
    setFollow(true)
  }

  return (
    <div className="userdetails__container">
      <h1 className="profile_text">
        {firstname.toUpperCase()} {lastname.toUpperCase()}
      </h1>
      <span className="profile__subtext">{email}</span>
      <div className="profile_stats">
        <div className="profile__followers">
          <h2 className="count">{followersCount}</h2>
          <span className="profile__subtext">followers</span>
        </div>
        <div className="profile__followings">
          <h2 className="count">{followingsCount}</h2>
          <span className="profile__subtext">followings</span>
        </div>
      </div>
      <Fragment>
        <Navbar
          items={[
            {
              text: "Posts",
              link: "/profile",
              style: "dashboard__navItem",
              onclick: () => {
                postClick()
              },
              active: post,
            },
            {
              text: "Following",
              link: "/",
              style: "dashboard__navItem",
              onclick: () => {
                followingClick()
              },
              active: following,
            },
            {
              text: "Followers",
              link: "/",
              style: "dashboard__navItem",
              onclick: () => {
                followerClick()
              },
              active: follower,
            },
            {
              text: "Follow",
              link: "/",
              style: "dashboard__navItem",
              onclick: () => {
                followClick()
              },
              active: follow,
            },
          ]}
        />
        {post && <Post />}
        {following && <div>following</div>}
        {follower && <div>follower</div>}
        {follow && <Follow />}
      </Fragment>
    </div>
  )
}

export default UserDetails
