import React from "react"
import { Spinner } from "@chakra-ui/core"

import "./index.css"

const Loader = () => (
  <div className="component-loader">
    <Spinner size="xl" />
  </div>
)

export default Loader
