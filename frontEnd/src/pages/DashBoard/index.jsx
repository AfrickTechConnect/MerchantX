import React from "react"
import { Image } from "@chakra-ui/core"
import { connect } from "react-redux"
import "./index.css"

const DashBoard = ({ data }) => {
  const { avatarUrl } = data.UserData.user
  return (
    <section className="dashboard__container">
      <Image rounded="full" size="100px" src={avatarUrl} alt="Segun Adebayo" />
      <div> users details</div>
    </section>
  )
}

const mapStateToProps = (state) => ({
  data: state.user,
})

export default connect(mapStateToProps, null)(DashBoard)
