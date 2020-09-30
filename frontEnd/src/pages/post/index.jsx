import React, { useEffect } from "react"
import { bindActionCreators } from "redux"
import { getUserPosts, createUserPosts } from "../../../actions"
import { connect } from "react-redux"
import Loader from "../../components/spinner"
import "./index.css"

const Post = ({ posts, getPostsRequest, createPosts }) => {
  const { loading, UserPosts } = posts
  console.log(UserPosts, "here is my created posts")
  useEffect(() => {
    getPostsRequest()
  }, [])
  return <div>{loading ? <Loader /> : <>hello post</>}</div>
}

const mapStateToProps = (state) => ({
  posts: state.post,
})

const mapDispatchToProps = (dispatch) => ({
  getPostsRequest: () => dispatch(getUserPosts()),
  createPosts: (payload) => dispatch(createPosts(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Post)
