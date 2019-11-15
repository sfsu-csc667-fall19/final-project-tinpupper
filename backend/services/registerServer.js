require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('../mongo/connect');
const User = require('../models/user.model');

const app = express();
const port = 3006;
const mongoUrl =
  'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

/* * * * * * * * * * * *
 * CONNECT TO DATABASE *
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(`/register`, (req, res) => {
  console.log(`Attempting to register...`);
  const { username, password, isBusiness } = req.body;

  User.create({ username, password, isBusiness }, (err, user) => {
    if (err) {
      console.log('Register failed...');
      return res.status(400).send({
        error: err.message,
        message:
          'The user probably existed in the database or a field is missing',
      });
    }

    console.log('Register successful...');
    return res.send({
      id: user._id,
      message: 'Successfully registered user',
      user: user.username,
      isBusiness,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
