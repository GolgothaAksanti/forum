/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable valid-jsdoc */
import ResponseHandler from '../helpers/responseHandler';
import userRoutes from './auth';

const apiVersion = '/api/v1';
/** @class MyRouter */
class MyRouter {
  /** run
   * @static
   * @param {*} app
   * @memberof MyRouter
   */
  static run(app) {
    app.use(apiVersion, userRoutes);

    app.get(apiVersion, (req, res) => {
      ResponseHandler.ok(res, 200, 'Welcome to My forum');
    });

    app.all('/', (req, res) => {
      ResponseHandler.ok(res, 401, 'Method is invalid');
    });

    app.use('*', (req, res) => {
      ResponseHandler.ok(res, 404, 'Route not found');
    });
  }
}

export default MyRouter;
