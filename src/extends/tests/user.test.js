import request from 'supertest';
import app from '../../app/app';

import db from '../../database/models';
import { userData, userLoginData, wrongUser,wrongPswd } from '../mocks/dummyData';
import { urlPrefix } from '../mocks/variables';

describe('User Signup and Signin Tests', () => {
    it('Should create a user', done => {
        request(app)
            .post(`${urlPrefix}/auth/signup`)
            .send(userData)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.status).toBe(201);
                expect(res.body.message).toBe('User Created Successfully');
                expect(res.body.data).toHaveProperty('token');
                done();
            });
    });
    it('Should not create a user with the same email', done => {
        request(app)
            .post(`${urlPrefix}/auth/signup`)
            .send(userData)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.status).toBe(409);
                expect(res.body.message).toBe('User Already Exists');
                done();
            });
    });
    it('Should login a user', done => {
        request(app)
            .post(`${urlPrefix}/auth/signin`)
            .send(userLoginData)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.status).toBe(200);
                expect(res.body.message).toBe('Success');
                expect(res.body.data).toHaveProperty('token');
                done();
            });
    });
    it('Should not login a user with a fake username', done => {
        request(app)
            .post(`${urlPrefix}/auth/signin`)
            .send(wrongUser)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.status).toBe(404);
                expect(res.body.message).toBe('User not found!');
                done();
            });
    });
    it('Should not login a user with a fake password', done => {
        request(app)
            .post(`${urlPrefix}/auth/signin`)
            .send(wrongPswd)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.status).toBe(404);
                expect(res.body.message).toBe('Not found!');
                done();
            });
    });
    
});
afterAll(async () => {
  await db.User.destroy({
    where: {},
    truncate: true,
  })
});