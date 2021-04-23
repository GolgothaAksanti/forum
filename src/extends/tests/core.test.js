import request from 'supertest';
import app from '../../app/app';

import { urlPrefix } from '../mocks/variables';

describe('', () => {
    it('should return a success request', done => {
        request(app)
        .get(urlPrefix)
        .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(200);
        expect(res.body.message).toBe('Welcome to My forum');
        done();
      });
    })
    it('should return invalid method', done => {
        request(app)
        .get('/')
        .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(401);
        expect(res.body.message).toBe('Method is invalid');
        done();
      });
    })
    it('should return Route not found when there ', done => {
        request(app)
        .get('/false')
        .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(404);
        expect(res.body.message).toBe('Route not found');
        done();
      });
    })

});