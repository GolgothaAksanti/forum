/* eslint-disable no-unused-vars */
import schema from '../helpers/userSchema';
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
    return next();
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
    return next();
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
    return next();
  }
}

export default Validator;
