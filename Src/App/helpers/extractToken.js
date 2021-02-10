/* eslint-disable linebreak-style */
import JwtAuth from './jwtHelper';
import ResponseHandler from './responseHandler';

/** @class ExtractToken */
class ExtractToken {
  /**
   * extractAccessToken
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {Int} userId
   * @memberof ExtractToken
   */
  static async extractAccessToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      ResponseHandler.error(res, 404, 'Access Denied!');
      return next();
    }

    const extractToken = token.split(' ')[1];
    const userId = await JwtAuth.getCurrentUserId(extractToken);
    if (!userId) {
      ResponseHandler.error(res, 404, 'Not Authorized!');
      return next();
    }
    return userId;
  }
}

export default ExtractToken;
