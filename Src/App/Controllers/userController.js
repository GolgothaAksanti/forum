/* eslint-disable linebreak-style */
/* eslint-disable no-console */
import UserServices from '../../database/services/userService';
import ResponseHandler from '../helpers/responseHandler';
import CryptPswd from '../helpers/utils';
import JwtAuth from '../helpers/jwtHelper';
/**
 * @class UserController
 */
class UserController {
  /**
   * signup user in the database
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof UserController
   */
  static async signup(req, res, next) {
    const reqUser = req.body.username;
    const reqEmail = req.body.email;
    const emailExist = await UserServices.existEmail(reqEmail);
    const userExist = await UserServices.existUser(reqUser);

    if (emailExist) {
      ResponseHandler.error(res, 409, 'User Already Exist with that email');
      return next();
    }

    if (userExist) {
      ResponseHandler.error(res, 409, 'User with username already exist');
      return next();
    }
    const { username, email, password } = req.body;

    const hashedPswd = await CryptPswd.incryptPswd(password);

    const createUser = {
      username,
      email,
      password: hashedPswd,
    };

    const addUser = await UserServices.createUser(createUser);

    const userE = req.body.username;
    const getId = await UserServices.getExistId(userE);
    const { id } = getId;

    delete req.body.password;

    const token = await JwtAuth.signAccessToken(id);

    if (addUser) {
      ResponseHandler.success(res, 201, 'User Created Successfully', {
        id,
        ...req.body,
        token,
      });
    }
  }

  /**
   * signin.
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {object} data
   * @memberof UserController
   */
  static async signin(req, res, next) {
    const userSignin = req.body.username;

    const currentUser = await UserServices.signInUser(userSignin);
    if (!currentUser) {
      ResponseHandler.error(res, 404, 'User not found!');
      next();
    }

    const pswdSignin = req.body.password;
    const pswdMatch = await CryptPswd.comparePswd(
      pswdSignin,
      currentUser.password,
    );
    if (!pswdMatch) {
      ResponseHandler.error(res, 404, 'Not found!');
      next();
    }
    const { id, username } = currentUser;

    const token = await JwtAuth.signAccessToken(id);

    ResponseHandler.success(res, 200, 'User successfully log in', {
      id,
      username,
      token,
    });
  }
}

export default UserController;
