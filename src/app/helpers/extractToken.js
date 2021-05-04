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
      ResponseHandler.error(res, 401, 'Unauthorized!');
      return next();
    }

    const extractToken = token.split(' ')[1];
    const userId = await JwtAuth.getCurrentUserId(extractToken);
    // eslint-disable-next-line radix
    const id = parseInt(userId);
    return id;
  }
}

export default ExtractToken;
