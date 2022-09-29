const request = require('supertest');
const url = require('url');
const { expect } = require('chai');
const { app } = require('../server');

const getRequest = (route, token) => request(app)
  .get(route)
  .set('Authorization', token)
  .set('Accept', 'application/json');
const postRequest = (route, token) => request(app)
  .post(route)
  .set('Authorization', token)
  .set('Accept', 'application/json');
const putRequest = (route, token) => request(app)
  .put(route)
  .set('Authorization', token)
  .set('Accept', 'application/json');
const deleteRequest = (route, token) => request(app)
  .delete(route)
  .set('Authorization', token)
  .set('Accept', 'application/json');
module.exports = {
  expect,
  app,
  url,
  request,
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
};
