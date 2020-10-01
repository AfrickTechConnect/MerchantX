import React, { useEffect, useState } from "react"
import { getUserFollowers } from "../../../actions"
import { Radio, RadioGroup } from "@chakra-ui/core"
import { connect } from "react-redux"
import Loader from "../spinner"
import FollowCard from "../followCard"

const AllFollowers = ({ follows, getUserFollower }) => {
  const [value, setValue] = React.useState("DESC")
  const { isloadingFollower, allfollowers, followersStatus } = follows
  useEffect(() => {
    getUserFollowers(value)
  }, [])
  return (
    <>
      <div className="following__filters">
        <RadioGroup
          onChange={(e) => {
            setValue(e.target.value)
            getUserFollower(value)
          }}
          value={value}
        >
          <Radio value="ASC">Last Added</Radio>
          <Radio value="DESC">First Added</Radio>
        </RadioGroup>
      </div>
      {isloadingFollower && <Loader />}
      <div>
        {followersStatus &&
          allfollowers.followers.map((item, key) => {
            return <FollowCard key={key} follow={item.follower} />
          })}
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  follows: state.follow,
})

const mapDispatchToProps = (dispatch) => ({
  getUserFollower: (value) => dispatch(getUserFollowers(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllFollowers)
