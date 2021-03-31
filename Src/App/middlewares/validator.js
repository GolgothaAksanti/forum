/* eslint-disable linebreak-style */
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
    const value = await schema.signup.validate(req.body);
    if (!value.error) {
      return next();
    }
    ResponseHandler.error(res, 402, value.error.message);
  }

  /**
   * create
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof Validator
   */
  static async signin(req, res, next) {
    const value = await schema.signin.validate(req.body);
    if (!value.error) {
      return next();
    }
    ResponseHandler.error(res, 402, value.error.message);
  }

  /**
   * createblog
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof Validator
   */
  static async createBog(req, res, next) {
    const value = await schema.createBlog.validate(req.body);
    if (!value.error) {
      return next();
    }
    ResponseHandler.error(res, 402, value.error.message);
  }
}

export default Validator;
