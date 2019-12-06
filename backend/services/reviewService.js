require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connect = require('../mongo/connect');
const Review = require('../models/review.model');
const axios = require('axios');

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

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* * * * * * * * * * * * * *
 * GET Single Review by ID *
 * * * * * * * * * * * * * */
app.get(`/review/:id`, async (req, res) => {
  // 0) Look at "services/restaurantServer" and look for the giant "GET RESTAURANT" comment box for how to do it
  // 1) Get id from req.params.id
  // 2) Use Review.findById to get review and store inside "result" variable
  // 3) Check if "result" is null (see the file in step 0)
  // 4) res.send in the format below:
  /**
   * {
   *    message: "Found review",
   *    userId: result.userId,
   *    text: result.text,
   *    restaurantId: result.restaurantId
   * }
   */
});

/* * * * * * * * * * * * *
 * POST Review           *
 * * * * * * * * * * * * */
app.post(`/review`, (req, res) => {
  console.log(`Attempting to post review...`);
  // 0) Look at "services/registerServer" and look for the giant "REGISTER NEW USER" comment box for how to do it
  // 1) Get restaurantId, userId, and text from
  //     - req.body.restaurantId & req.body.userId & req.body.text
  const { restaurantId, userId, text, username } = req.body;
  // 2) Use Review.create to create the review. See file in step 0.

  // Create new user in mongoDB
  Review.create({ restaurantId, userId, text, username }, async (err, review) => {
    console.log('Inside Review.Create');
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
    };

    try {
      await axios.post('http://restaurant:3012/restaurant/addReview', { restaurantId, reviewId: review._id }, headers);

      return res.send({
        userId: review.userId,
        message: 'Successfully posted review',
        text: review.text,
        restaurantId: review.restaurantId,
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  });

  // 4) res.send in the format below:
  /**
   * {
   *    message: "Successfully posted review",
   *    userId: userId,
   *    text: text,
   *    restaurantId: restaurantId
   * }
   */
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
