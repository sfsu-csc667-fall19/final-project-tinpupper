require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const md5 = require('md5');
const connect = require('../mongo/connect');
const User = require('../models/user.model');
const { cookiesNotNull, authenticate } = require('../note/note.controller');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3010;

const mongoUrl =
  'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

/* * * * * * * * * * * *
 * CONNECT TO MONGODB  *
 * * * * * * * * * * * */
connect(mongoUrl)
  .then(async connection => {
    console.log('Connected to database in registerService');
  })
  .catch(e => {
    console.error(
      '+_+_+_+_+ Failed to connect to database in registerService +_+_+_+_+',
    );
  });

app.use(cookiesNotNull);
app.use(authenticate);

app.post(`/user`, (req, res) => {});

/* * * * * * * * * *
 * DELETE USER     *
 * * * * * * * * * */
app.delete('/user/:id', async (req, res) => {
  const id = req.params.id;

  console.log('deleting id');

  const removed = await User.findByIdAndRemove(id, {
    useFindAndModify: false,
  }).exec();

  if (!removed) {
    return res.send({
      removed,
      error: 'Did not remove user',
    });
  }

  return res.send({
    removed,
    message: 'Deleted user',
  });
});

app.listen(port, () =>
  console.log(`authService app listening on port ${port}!`),
);
