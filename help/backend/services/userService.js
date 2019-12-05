require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connect = require('../mongo/connect');
const User = require('../models/user.model');
const { cookiesNotNull, authenticate } = require('../note/note.controller');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3010;

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

app.use(cookiesNotNull);
app.use(authenticate);
app.use(morgan());

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * REGISTER USER (NOT USED; LOOK AT REGISTERSERVER)   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * */
app.post('/user', (req, res) => {
  res.send('Use /register route for registation');
});

/* * * * * * * * * * * *
 * UPDATE SINGLE USER  *
 * * * * * * * * * * * */
app.put('/user/:id', (req, res) => {
  /**
   * 1) Get the user's id from req.params
   * 2) Update user information from the database using this function
   *    - User.findByIdAndUpdate( id, { body }, func(err, res) )
   *    - Go to /note/note.controller.js and CTRL+F "Note.findByIdAndUpdate" for an example usage
   * 3) Send back responses properly (see documentation in USER section for PUT method)
   */
});

/* * * * * * * * * *
 * GET SINGLE USER *
 * * * * * * * * * */
app.get('/user/:id', (req, res) => {
  /**
   * 1) Get the user's id from req.params
   * 2) Get user information from the database using this function
   *    - User.findById( id, func(err, res) )
   *    - Go to /note/note.controller.js and CTRL+F "Note.findById" for an example usage
   * 3) Send back responses properly (see documentation in USER section for GET method)
   */
});

/* * * * * * * * * *
 * GET ALL USERS   *
 * * * * * * * * * */
app.get('/user', (req, res) => {
  /**
   * 1) Get user information from the database using this function
   *    - User.find({}, func(err, res) )
   *    - Go to /note/note.controller.js and CTRL+F "Note.find({})" for an example usage
   * 2) Send back responses properly (see documentation in USER section for GET method)
   */
});

/* * * * * * * * * *
 * DELETE USER     *
 * * * * * * * * * */
app.delete('/user/:id', (req, res) => {
  /**
   * 1) Get user information from the database using this function
   *    - User.findByIdAndRemove( id, func(err, res) )
   *    - Go to /note/note.controller.js and CTRL+F "Note.findByIdAndRemove" for an example usage
   * 2) Send back responses properly (see documentation in USER section for DELETE method)
   */
});

app.listen(port, () => console.log(`userService app listening on port ${port}!`));
