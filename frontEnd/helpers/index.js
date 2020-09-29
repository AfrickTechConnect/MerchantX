import axios from "axios"
import { getFromStorage } from "./storageHelper"

const fetchData = async (method, url, data, config) => {
  axios.defaults.baseURL = "http://localhost:6000"
  axios.defaults.headers.common.Authorization = getFromStorage("token")
  const response = await axios({
    method,
    url,
    data,
    config,
  })
  return response
}

export default fetchData
