/**
 * @name serverResponse
 * @param {Object} res express response object
 * @param {Number} code status code to return
 * @param {Ojectb} data object with response details
 * @returns {JSON} JSON response with status and response information
 */
const serverResponse = (req, res, code, data) => {
  res.status(code).json({ 
    MERCHANTX: "v1",
    data: {
      ...data
    }
   });
}

/**
 * @name serverError
 * @param {Object} res express response object
 * @returns {JSON} JSON response with server error details
 */
const serverError = (res) =>
  res.status(500).json({ 
    MERCHANTX: "v1",
    data: {
      message: 'an error occoured will be resolved shortly'
    }
   });
  
export { serverResponse, serverError };