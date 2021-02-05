/* eslint-disable linebreak-style */
import JWT from 'jsonwebtoken';
// eslint-disable-next-line no-unused-vars
import dotenv from 'dotenv/config';
import ResponseHandler from './responseHandler';

/** @class JwtAuth */
class JwtAuth {
  /**
   * signAccessToken
   * @static
   * @param {*} userId
   * @return {Promise} with that id
   * @memberOf JwtAuth
   */
  static signAccessToken(userId) {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: '24H',
        issuer: 'golgotha.com',
        audience: userId.toString(),
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  }

  /**
   * verifyAccessToken
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return{void}
   * @memberOf JwtAuth
   */
  static verifyAccessToken(req, res, next) {
    if (!req.headers.authorization) {
      ResponseHandler.error(res, 501, 'Server error');
      next();
    }
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
      if (err) {
        // if (err.name === 'JsonWebTokenError') {
        //   ResponseHandler.error(res, 501, 'Access Denied');
        // } else {
        //   ResponseHandler.error(res, 501, err.message);
        //   next();
        // }
        const message = err.name === 'JsonWebTokenError' ? 'Access Denied' : err.message;
        ResponseHandler.error(res, 501, message);
      }
      req.payload = payload;
      next();
    });
  }

  /**
   * signAccessToken
   * @static
   * @param {*} userId
   * @return {Promise} with that id
   * @memberOf JwtAuth
   */
  static signRefreshToken(userId) {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: '1y',
        issuer: 'golgotha.com',
        audience: userId.toString(),
      };
      JWT.sign(payload, secret, options, (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      });
    });
  }

  /**
   * verifyRefreshToken
   * @param {*} refreshToken
   * @return{Promise} promisi with the user id
   */
  static verifyRefreshToken(refreshToken) {
    return new Promise((resolve, reject) => {
      JWT.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(err);
          const userId = payload.aud;
          resolve(userId);
        },
      );
    });
  }
}

export default JwtAuth;
