require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const md5 = require('md5');
const morgan = require('morgan');
const connect = require('../mongo/connect');
const User = require('../models/user.model');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan());

app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3002;
const mongoUrl = 'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

/* * * * * * * * * * * *
 * CONNECT TO MONGODB  *
 * * * * * * * * * * * */
connect(mongoUrl)
  .then(async connection => {
    console.log('Connected to database in registerService');
  })
  .catch(e => {
    console.error('+_+_+_+_+ Failed to connect to database in registerService +_+_+_+_+');
  });

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * AUTH COOKIE (Can use directly)                                *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
app.post(`/auth/cookies`, (req, res) => {
  console.log(`Attemping to verify user in login with cookies`);
  console.log(`user: `, req.cookies);

  if (req.cookies === undefined || req.cookies.username === undefined || req.cookies.password === undefined) {
    console.log('FAILED: USER INFORMATION UNDEFINED');
    return res.status(400).send({
      path: '/auth/cookie',
      error: 'FAILED TO AUTHORIZE: Client does not have cookies stored for username or password',
      valid: false,
    });
  }

  const { username, password } = req.cookies;
  return findUser(username, password, res);
});

/* * * * * * * * * *
 * AUTH BODY       *
 * * * * * * * * * */
app.post(`/auth/login`, (req, res) => {
  console.log(`Attemping to verify user in login with body`);
  console.log(`user: `, req.body);

  if (req.body === undefined || req.body.username === undefined || req.body.password === undefined) {
    console.log('FAILED: USER INFORMATION UNDEFINED');
    return res.status(400).send({
      path: '/auth/login',
      error: 'FAILED TO AUTHORIZE: Client did not send a body with a username and password field',
      valid: false,
    });
  }

  const { username, password } = req.body;
  return findUser(username, password, res);
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * AUTH COOKIES (USED FOR ANOTHER SERVICE DO NOT USE DIRECTLY)   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
app.post(`/auth`, (req, res) => {
  /**
   * The reason why body is used here is because we took the cookies and passed it into body
   */
  console.log(`Attemping to verify user in login with cookies`);
  console.log(`user: `, req.body);

  if (req.body === undefined || req.body.username === undefined || req.body.password === undefined) {
    console.log('FAILED: USER INFORMATION UNDEFINED');
    return res.status(400).send({
      path: '/auth',
      error: 'FAILED TO AUTHORIZE: Client does not have cookies stored for username or password',
      valid: false,
    });
  }

  const { username, password } = req.body;
  return findUser(username, password, res);
});

app.listen(port, () => console.log(`authService app listening on port ${port}!`));

/* * * * * *
 * HELPERS *
 * * * * * */
const findUser = (username, password, res) => {
  return User.findOne({ username, password }, (err, user) => {
    if (err) return res.send({ error: 'Database Error', valid: false });
    if (!user) return res.send({ error: 'Bad user information', valid: false });
    return res.send({
      message: 'Successfully authenticated',
      valid: true,
      user,
    });
  });
};
