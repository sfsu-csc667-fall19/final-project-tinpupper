require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connect = require('../mongo/connect');
const User = require('../models/user.model');

const app = express();
app.use(morgan());
const port = 3006;
const mongoUrl = 'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

/* * * * * * * * * * * *
 * CONNECT TO DATABASE *
 * * * * * * * * * * * */
connect(mongoUrl)
  .then(async connection => {
    console.log('Connected to database in registerService');
  })
  .catch(e => {
    console.error('+_+_+_+_+ Failed to connect to database in registerService +_+_+_+_+');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* * * * * * * * * * *
 * REGISTER NEW USER *
 * * * * * * * * * * */
app.post(`/register`, (req, res) => {
  console.log(`Attempting to register...`);

  // Get information about user from the frontend
  const { username, password, isBusiness } = req.body;

  // Create new user in mongoDB
  User.create({ username, password, isBusiness }, (err, user) => {
    // Failed to create new user
    if (err) {
      console.log('Register failed...');

      // We return here because we don't want to execute any further in the code
      return res.status(400).send({
        error: err.message,
        message: 'The user probably existed in the database or a field is missing',
      });
    }

    // Didnt error out so the user was created
    console.log('Register successful...');

    // Tell front end that we registered the user
    return res.send({
      id: user._id,
      message: 'Successfully registered user',
      user: user.username,
      isBusiness,
    });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
