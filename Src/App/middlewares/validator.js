/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import schema from '../helpers/userSchema';
import ResponseHandler from '../helpers/responseHandler';
/**
 * @class Validator
 */
class Validator {
  /**
   * create
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof Validator
   */
  static async signup(req, res, next) {
    const value = await schema.user.validate(req.body);
    if (value.error) {
      ResponseHandler.error(res, 402, value.error.message);
    } else {
      next();
    }
  }
}

export default Validator;
