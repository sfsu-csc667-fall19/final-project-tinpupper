require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connect = require('../mongo/connect');
const Review = require('../models/review.model');
const User = require('../models/user.model');
const axios = require('axios');
const { cookiesNotNull, authenticate } = require('../note/note.controller');

const app = express();
const port = 3013;
const mongoUrl = 'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

/* * * * * * * * * * * *
 * CONNECT TO DATABASE *
 * * * * * * * * * * * */
connect(mongoUrl)
  .then(async connection => {
    console.log('Connected to database in REVIEW');
  })
  .catch(e => {
    console.error('+_+_+_+_+ Failed to connect to database in REVIEW +_+_+_+_+');
  });

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* * * * * * * * * * * * * *
 * GET Single Review by ID *
 * * * * * * * * * * * * * */
app.get(`/review/:id`, async (req, res) => {
  console.log('inside review/:id');
  const { id } = req.params;

  const result = await Review.findById(id).exec();

  if (!result) {
    console.log('Could not find review...');
    return res.status(400).send({
      error: err.message,
      message: 'Unable to get review',
    });
  }

  console.log('Found review...');

  return res.send({
    message: 'Review found',
    userId: result.userId,
    text: result.text,
    restaurantId: result.restaurantId,
  });
});

/**
 * BELOW ARE AUTH ROUTES
 */
app.use(cookiesNotNull);
app.use(authenticate);

/* * * * * * * * * * * * *
 * POST Review           *
 * * * * * * * * * * * * */
app.post(`/review`, (req, res) => {
  console.log(`Attempting to post review...`);

  const { restaurantId, text } = req.body;
  const { username, password } = req.cookies;

  // Look up user via cookies
  // Get userId and username
  User.find({ username, password }, (err, user) => {
    if (err) {
      res.send({ error: err, message: 'failed to post' });
    }
    console.log(user);

    // Create new user in mongoDB
    return Review.create({ restaurantId, userId: user[0]._id, text, username: user[0].username }, (err, review) => {
      console.log('Inside Review.Create');
      console.log(req.cookies);
      // Failed to create new user
      if (err) {
        console.log('Post review failed...');

        return res.status(400).send({
          error: err.message,
          message: 'Failed to post review',
        });
      }

      console.log('Posted review successful...');

      // Also need to update the Restaurant collection with the review
      const headers = {
        Cookie: 'username=bob; password=123;',
        withCredentials: true,
      };

      // Add review to the restaurantIds
      const p1 = axios.post(
        'http://restaurant:3012/restaurant/addReview',
        { restaurantId, reviewId: review._id, username: req.cookies.username, password: req.cookies.password },
        headers,
      );

      // Add review to the user's collection
      const p2 = axios.post(
        'http://user:3010/user/updateReview',
        { userId: user[0]._id, reviewId: review._id, username: req.cookies.username, password: req.cookies.password },
        headers,
      );

      Promise.all([p1, p2])
        .then(values => {
          console.log('Resolving all Restaurant and User update for review...');
          // console.log(values[0]);
          // console.log(values[1]);

          return res.send({
            userId: user[0]._id,
            message: 'Successfully posted review',
            text: review.text,
            restaurantId: review.restaurantId,
          });
        })
        .catch(err => {
          console.log('PROMISE ALL FAILED IN REVIEW SERVICE: ', err);
          return res.send({ error: err, message: 'Failed to resolve all promise in review POST' });
        });
    });
  });
});

/* * * * * * * * * * * * *
 * UPDATE Review         *
 * * * * * * * * * * * * */
app.put('/review/:id', (req, res) => {
  // 0) Look at "services/userService" and look for the giant "UPDATE SINGLE USER" comment box for how to do it
  // 1) Get id from req.params.id &  Get text from req.body.text
  // 2) Use Review.findByIdAndUpdate to get review and store inside "updated" variable
  //    - Only update the "text" field
  // 3) Check if "update" is null (see the file in step 0)
  // 4) res.send in the format below:
  /**
   * {
   *    message: "Updated review",
   *    userId: updated.userId,
   *    text: updated.text,
   *    restaurantId: updated.restaurantId
   * }
   */
});

/* * * * * * * * * * * * * * *
 * DELETE RESTAURANT by ID   *
 * * * * * * * * * * * * * * */
app.delete(`/review/:id`, (req, res) => {
  // 0) Look at "services/restaurantServer" and look for the giant "DELETE RESTAURANT" comment box for how to do it
  // 1) Get id from req.params.id
  // 2) Use Review.findByIdAndRemove to delete review and store inside "remove" variable
  // 3) Check if "remove" is null (see the file in step 0)
  // 4) res.send in the format below:
  /**
   * {
   *    message: "Deleted review",
   *    userId: removed.userId,
   *    text: removed.text,
   *    restaurantId: removed.restaurantId
   * }
   */
});

app.listen(port, () => console.log(`REVIEW: ${port}!`));
