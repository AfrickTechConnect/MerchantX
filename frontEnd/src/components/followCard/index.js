import React, { Fragment } from "react"
import { Image } from "@chakra-ui/core"
import "./index.css"

const FollowCard = (props) => {
  const { firstname, lastname, avatarUrl, email } = props.follow
  return (
    <div className="followers">
      <Image rounded="full" size="50px" src={avatarUrl} alt="username you are following" />
      <div className="follwers__subtext">
        <p>
          {firstname.toUpperCase()} {lastname.toUpperCase()}
        </p>
        <div className="following__mail">{email}</div>
      </div>
    </div>
  )
}
export default FollowCard
