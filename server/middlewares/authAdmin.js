import { serverResponse } from '../helper/serverResponse';

/**
 * @name authAdmin
 * @param {Object} request express request object
 * @param {Object} response express response object
 * @param {Object} next express next function that calls the next middleware
 * @returns {Void} it calls the next middleware
 */
const authAdmin = async (request, response, next) => {
  const { type } = request.user;
  if (type !== 'admin') {
    return serverResponse(request, response, 403, {
      message: 'unauthorized user'
    });
  }
  next();
};

export default authAdmin;