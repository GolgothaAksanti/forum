import request from 'supertest';
import app from '../../app/app';

import db from '../../database/models';
import JwtAuth from '../../app/helpers/jwtHelper'
import {blogData, updateBlogData } from '../mocks/dummyData';
import { urlPrefix } from '../mocks/variables';

let token;
beforeAll(async () => {
  token = await JwtAuth.signAccessToken(1);
  token = `Bearer ${token}`;
});
describe('Blog Tests', () => {
  it('Should respond not found when there is not Blog in the database', async done => {
    request(app)
      .get(`${urlPrefix}/blog/posts/1`)
      .set('authorization', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(404);
        expect(res.body.message).toBe('Not found!');
        done();
      });
    });
    it('Should Register a new Blog', async done => {
    request(app)
      .post(`${urlPrefix}/blog/posts`)
      .set('authorization', token)
      .send(blogData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(201);
        expect(res.body.message).toBe('blog created!');
        done();
      });
    });
  it('Should get a single Blog in the database', async done => {
    request(app)
      .get(`${urlPrefix}/blog/posts/1`)
      .set('authorization', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(200);
        expect(res.body.message).toBe('ok');
        done();
      });
    });
    it('should list all blog up from the database on token with existent user', async (done) => {
         request(app)
             .get(`${urlPrefix}/blog/posts`)
             .set('authorization', token)
             .end((err, res) => {
                 if (err) done(err);
                 expect(res.status).toBe(200);
                 expect(res.body).toHaveProperty('message', 'Success');
                 expect(res.body.data).toEqual(expect.any(Array));
                 done();
             });
    });
    it('Should not Register a new Blog that already exists', async done => {
    request(app)
      .post(`${urlPrefix}/blog/posts`)
      .set('authorization', token)
      .send(blogData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(409);
        expect(res.body.message).toBe('Already exist');
        done();
      });
    });
  
  it('Should Update a new Blog', async done => {
    request(app)
      .put(`${urlPrefix}/blog/posts/1`)
      .set('authorization', token)
      .send(updateBlogData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(200);
        expect(res.body.message).toBe('Updated successfully');
        done();
      });
  });
  it('Should delete a blog', async done => {
    request(app)
      .delete(`${urlPrefix}/blog/posts/1`)
      .set('authorization', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(200);
        expect(res.body.message).toBe('Deleted');
        done();
      });
  });
  
  it('Should respond not found when there is not a blog found int the database', async done => {
    request(app)
      .delete(`${urlPrefix}/blog/posts/1`)
      .set('authorization', token)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(404);
        expect(res.body.message).toBe('Not found!');
        done();
      });
    });
    it('Should not Register a new Blog with no token', async done => {
    request(app)
      .post(`${urlPrefix}/blog/posts`)
      .send(blogData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(401);
        expect(res.body.message).toBe('Unauthorized!');
        done();
      });
    });
  it('Should not Update a new Blog if it doe not exist', async done => {
    request(app)
      .put(`${urlPrefix}/blog/posts/11`)
      .set('authorization', token)
      .send(updateBlogData)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body.status).toBe(404);
        expect(res.body.message).toBe('Not Found!');
        done();
      });
  });
});

afterAll(async () => {
  await db.Blog.destroy({
    where: {},
    truncate: true,
  })
});