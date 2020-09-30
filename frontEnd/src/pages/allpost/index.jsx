import React, { useEffect } from "react"
import { bindActionCreators } from "redux"
import { getUserPosts, createUserPosts } from "../../../actions"
import { connect } from "react-redux"
import Loader from "../../components/spinner"
import Post from "../../components/post"
import "./index.css"

const AllPost = ({ posts, getPostsRequest }) => {
  const { loading, UserPosts, postsStatus } = posts

  useEffect(() => {
    getPostsRequest()
  }, [])
  return (
    <>
      {loading && <Loader />}
      <div>
        {postsStatus &&
          UserPosts.data.posts.map((post, key) => {
            {
              console.log(post, "hello post>>>>>")
            }
            return <Post key={key} post={post} />
          })}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  posts: state.post,
})

const mapDispatchToProps = (dispatch) => ({
  getPostsRequest: () => dispatch(getUserPosts()),
  createPosts: (payload) => dispatch(createPosts(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllPost)
