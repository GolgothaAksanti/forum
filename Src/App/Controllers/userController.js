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
    // Check if the user already exists with that email
    if (emailExist) {
      ResponseHandler.error(
        res,
        400,
        `User Already Exist with that email ${reqEmail}`,
      );
      return next();
    }
    if (userExist) {
      // check the username if is already exists
      ResponseHandler.error(
        res,
        400,
        `User with username ${reqUser} already exist`,
      );
      return next();
    }
    try {
      const { username, email, password } = req.body;

      // crypt the password and remove it
      const hashedPswd = await CryptPswd.incryptPswd(password);

      const createUser = {
        username,
        email,
        password: hashedPswd,
      };

      // Inserting user in the database;
      const addUser = await UserServices.createUser(createUser);

      // Getting the inserted user ID from the db
      const userE = req.body.username;
      const getId = await UserServices.getExistId(userE);
      const { id } = getId;

      // remove the password
      delete req.body.password;

      // generate token
      const token = await JwtAuth.signAccessToken(id);
      const refreshToken = await JwtAuth.signRefreshToken(id);

      if (addUser) {
        ResponseHandler.success(res, 201, 'User Created Successfully', {
          id,
          ...req.body,
          token,
          refreshToken,
        });
      }
    } catch (e) {
      ResponseHandler.error(res, 500, 'Please Try again later');
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
    try {
      // Check if user already exist
      const userSignin = req.body.username;
      const currentUser = await UserServices.signInUser(userSignin);
      if (!currentUser) {
        ResponseHandler.error(res, 404, 'User not found!');
        next();
      }
      // compare if password provide by the user match the one in the database
      const pswdSignin = req.body.password;
      const pswdMatch = await CryptPswd.comparePswd(
        pswdSignin,
        currentUser.password,
      );
      if (!pswdMatch) {
        ResponseHandler.error(res, 401, 'Invalid Username or Password!');
        next();
      }
      const { id, username } = currentUser;

      // generate token
      const token = await JwtAuth.signAccessToken(id);
      const refreshToken = await JwtAuth.signRefreshToken(id);

      ResponseHandler.success(res, 200, 'User successfully log in', {
        id,
        username,
        token,
        refreshToken,
      });
    } catch (e) {
      ResponseHandler.error(res, 500, 'Please Try again later');
    }
  }
}

export default UserController;
