import React, { useEffect } from "react"
import { getUserFollows } from "../../../actions"
import { connect } from "react-redux"
import { Radio, RadioGroup } from "@chakra-ui/core"
import Loader from "../spinner"
import FollowCard from "../followCard"
import "./index.css"

const AllFollowing = ({ follows, getUserFollow }) => {
  const [value, setValue] = React.useState("DESC")
  const { loading, allfollows, followsStatus } = follows
  useEffect(() => {
    getUserFollow(value)
  }, [])
  return (
    <>
      <div className="following__filters">
        <RadioGroup
          onChange={(e) => {
            setValue(e.target.value)
            getUserFollow(value)
          }}
          value={value}
        >
          <Radio value="ASC">Last Added</Radio>
          <Radio value="DESC">First Added</Radio>
        </RadioGroup>
      </div>
      {loading && <Loader />}
      <div>
        {followsStatus &&
          allfollows.followings.map((item, key) => {
            return <FollowCard key={key} follow={item.following} />
          })}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  follows: state.follow,
})

const mapDispatchToProps = (dispatch) => ({
  getUserFollow: (value) => dispatch(getUserFollows(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllFollowing)
