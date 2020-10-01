import React, { useEffect } from "react"
import { getAllPosts } from "../../../actions"
import { connect } from "react-redux"
import Loader from "../../components/spinner"
import Post from "../../components/post"
import "./index.css"

const Explore = ({ explore, getAllPosts }) => {
  const { loading, UserPosts, postsStatus } = explore

  useEffect(() => {
    getAllPosts()
  }, [])
  return (
    <div className="dashboard__container">
      {loading && <Loader />}
      <div>
        {postsStatus &&
          UserPosts.data.map((post, key) => {
            return <Post key={key} post={post} />
          })}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  explore: state.explore,
})

const mapDispatchToProps = (dispatch) => ({
  getAllPosts: () => dispatch(getAllPosts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
