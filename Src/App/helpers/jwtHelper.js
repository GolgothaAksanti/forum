/* eslint-disable no-unused-vars */
import JWT from 'jsonwebtoken';
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
   * getCurrentUserId
   * @param {*} accessToken
   * @return {Promise} promise with the user id
   */
  static getCurrentUserId(accessToken) {
    return new Promise((resolve, reject) => {
      JWT.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, payload) => {
          if (err) return reject(err.message);
          const userId = payload.aud;
          resolve(userId);
        },
      );
    });
  }
}

export default JwtAuth;
