require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connect = require('../mongo/connect');
const User = require('../models/user.model');

const app = express();

const domain = process.env.DOMAIN || '';

const mongoUrl =
  'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

if (process.env.NODE_ENV === 'prod') {
  connect(mongoUrl)
    .then(async connection => {
      console.log('Connected to database in registerService');
    })
    .catch(e => {
      console.error(
        '+_+_+_+_+ Failed to connect to database in registerService +_+_+_+_+',
      );
    });
} else {
  connect(mongoUrl)
    .then(async connection => {
      console.log('Connected to database in registerService');
    })
    .catch(e => {
      console.error(
        '+_+_+_+_+ Failed to connect to database in registerService +_+_+_+_+',
      );
    });
}

app.use(bodyParser.json());

// POSTMAN url FORM ENCODED
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

const port = 3006;

app.post(`/register`, (req, res) => {
  console.log(`Attempting to register...`);
  const { username, password } = req.body;

  User.create({ username, password }, (err, user) => {
    if (err) return res.status(400).send({ error: err.message });
    console.log('Register successful...');
    return res.send({ message: 'Success', user: user.username });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
