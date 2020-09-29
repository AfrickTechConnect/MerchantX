import React, { useLayoutEffect } from "react"
import Home from "../Home"
import Dashboard from "../DashBoard"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { getUserDetails } from "../../../actions"
import Loader from "../../components/spinner"
import Login from "../../pages/login"

const Auth = (props) => {
  const { getUserDetails, isAuth, authenticating } = props
  useLayoutEffect(() => {
    getUserDetails()
  }, [])

  if ((props.location.state !== undefined) & (isAuth === true)) {
    props.history.push(props.location.state.from)
  }

  return (
    <div>
      {(authenticating == true) & (isAuth == false) ? <Loader /> : ""}
      {(isAuth == true) & (authenticating == false) ? <Dashboard /> : ""}
      {(isAuth == false) & (authenticating == false) ? (
        <Login RedirectLocation={props.location.state} />
      ) : (
        ""
      )}
    </div>
  )
}
const mapStateToProps = (state) => {
  const { user } = state
  const { isAuth, authenticating } = user
  return {
    isAuth,
    authenticating,
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserDetails,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
