import React, { Fragment } from "react"
import { Image, Modal, Box } from "@chakra-ui/core"
import { AiOutlineHome } from "react-icons/ai"
import { RiAdminLine } from "react-icons/ri"
import { BiPlus } from "react-icons/bi"
import { connect } from "react-redux"
import UserDetails from "../../components/userDetail"
import { Link } from "react-router-dom"
import "./index.css"

const DashBoard = ({ data }) => {
  const {
    avatarUrl,
    email,
    firstname,
    lastname,
    followingsCount,
    followersCount,
    type,
  } = data.UserData.user
  return (
    <section className="dashboard__container">
      <div className="dashboard__sideNav">
        <Image rounded="full" size="100px" src={avatarUrl} alt="Profile pix" />
        <div className="icon_container">
          <Link to="/post">
            <Box as={BiPlus} size="36px" />
          </Link>
        </div>
        <div className="icon_container">
          {type === "admin" && (
            <Link to="/admin">
              <Box as={RiAdminLine} size="32px" />
            </Link>
          )}
        </div>
        <div className="icon_container">
          <Link to="/explore">
            <Box as={AiOutlineHome} size="32px" />
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
