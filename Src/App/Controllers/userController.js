/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import UserServices from '../../database/services/userService';
import ResponseHandler from '../helpers/responseHandler';
/**
 * @class UserController
 */
class UserController {
  /**
   * signup.
   * @static
   * @param {*} req
   * @param {*} res
   * @returns {object} data
   * @memberof UserController
   */
  static async signup(req, res) {
    const { username, email, password } = req.body;

    const userData = {
      user: username,
      user_email: email,
      user_pass: password,
    };

    const result = await UserServices.createUser(userData);

    if (result === true) {
      ResponseHandler.ok(res, 200, 'userCreated');
    } else {
      ResponseHandler.error(res, 401, 'user not created');
    }
  }
}

export default UserController;
