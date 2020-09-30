import React, { Fragment } from "react"
import { Image, Modal } from "@chakra-ui/core"
import { connect } from "react-redux"
import UserDetails from "../../components/userDetail"
import { Link } from "react-router-dom"
import { IconButton, Icon } from "@chakra-ui/core"
import "./index.css"

const DashBoard = ({ data }) => {
  const {
    avatarUrl,
    email,
    firstname,
    lastname,
    followingsCount,
    followersCount,
  } = data.UserData.user
  return (
    <section className="dashboard__container">
      <div>
        <Image rounded="full" size="100px" src={avatarUrl} alt="Profile pix" />
        <div className="icon_container">
          <Link to="/post">
            <Icon name="add" size="32px" />
          </Link>
        </div>
      </div>
      <UserDetails
        firstname={firstname}
        lastname={lastname}
        email={email}
        followingsCount={followingsCount}
        followersCount={followersCount}
      />
    </section>
  )
}

const mapStateToProps = (state) => ({
  data: state.user,
})

export default connect(mapStateToProps, null)(DashBoard)
