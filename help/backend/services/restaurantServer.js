require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const connect = require('../mongo/connect');
const Restaurant = require('../models/restaurant.model');
const User = require('../models/user.model');
const KafkaProducer = require('../helpers/KafkaProducer');
const { RESTAURANT_DELETE, RESTAURANT_POST, RESTAURANT_UPDATE } = require('../helpers/KafkaTopicNames');
const { cookiesNotNull, authenticate } = require('../note/note.controller');

const producerPost = new KafkaProducer(RESTAURANT_POST);
const producerUpdate = new KafkaProducer(RESTAURANT_UPDATE);
const producerDelete = new KafkaProducer(RESTAURANT_DELETE);

producerPost.connect(() => {});
producerUpdate.connect(() => {});
producerDelete.connect(() => {});

const app = express();
const port = 3012;
const mongoUrl = 'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

/* * * * * * * * * * * *
 * CONNECT TO DATABASE *
 * * * * * * * * * * * */
connect(mongoUrl)
  .then(async connection => {
    console.log('Connected to database in RESTAURANT');
  })
  .catch(e => {
    console.error('+_+_+_+_+ Failed to connect to database in RESTAURANT +_+_+_+_+');
  });

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Uncomment to re-enable authentication
// app.use(cookiesNotNull);
// app.use(authenticate);

/* * * * * * * * * * * * *
 * GET ALL RESTAURANT    *
 * * * * * * * * * * * * */
app.get(`/restaurant`, async (req, res) => {
  console.log(`Getting ALL restaurants`);
  const restaurants = await Restaurant.find({}).exec();

  if (!restaurants) {
    console.log('Could not ALL restaurants');
    return res.status(400).send({
      error: err.message,
      message: 'Unable to get ALL restaurant',
    });
  }

  console.log('Found restaurant...');

  return res.send({
    message: 'Restaurants found',
    restaurants,
  });
});

/* * * * * * * * * * * * *
 * GET SINGLE RESTAURANT *
 * * * * * * * * * * * * */
app.get(`/restaurant/:id`, async (req, res) => {
  console.log(`Finding restaurant...`);
  const { id } = req.params;

  const result = await Restaurant.findById(id).exec();

  if (!result) {
    console.log('Could not find restaurant...');
    return res.status(400).send({
      error: err.message,
      message: 'Unable to get restaurant',
    });
  }

  console.log('Found restaurant...');

  return res.send({
    message: 'Restaurant found',
    name: result.name,
    description: result.description,
    ownerId: result.ownerId,
    reviewIds: result.reviewIds,
  });
});

app.use(cookiesNotNull);
app.use(authenticate);

/* * * * * * * * * * * * *
 * POST RESTAURANT       *
 * * * * * * * * * * * * */
app.post(`/restaurant`, async (req, res) => {
  const { name, description } = req.body;
  console.log(`${name} and ${description}`);
  console.log('before cookies');
  const { username, password } = req.cookies;
  const imageUrl =
    'https://cdn2.atlantamagazine.com/wp-content/uploads/sites/4/2019/07/RestaurantEugene01_courtesy.jpg';

  // Also need to get the logged in user _id from MongoDB
  // 1) MongoDB Search username and password combination to get that user
  console.log(`Finding ${username} and ${password}`);
  User.find({ username, password }, (err, user) => {
    if (err) {
      res.send({ error: err, message: 'failed to post' });
    }
    console.log(user);
    producerPost.send({ name, description, ownerId: user[0]._id, imageUrl, username, password });
    res.send({
      ownerId: user[0]._id,
      name,
      description,
      imageUrl,
      loggedIn: { username: user[0].username, password: user[0].password },
      message: 'Creating restaurant...',
    });
  });
});

/* * * * * * * * * * * * *
 * UPDATE RESTAURANT     *
 * * * * * * * * * * * * */
app.put('/restaurant/:id', (req, res) => {
  const { id } = req.params;
  producerUpdate.send({ id });

  // UPDATE isnt in documentation
  res.send({ name, message: 'Updating restaurant...' });
});

/* * * * * * * * * * * * *
 * PRIVATE POST: ADD TO review IDs       *
 * * * * * * * * * * * * */
app.post(`/restaurant/addReview`, (req, res) => {
  console.log('inside restaurant/addReview');
  console.log(req.body);
  const { restaurantId, reviewId } = req.body;

  let message = 'Updated restaurant with new reviewId';

  // Use mongoDB here to add to review array
  Restaurant.update({ _id: restaurantId }, { $push: { reviewIds: reviewId } }, (err, result) => {
    console.log('RESULT: ', result);
    console.log('ERR: ', err);
    if (err) message = 'Unable to updated review for restaurant';
    res.send({ restaurantId, reviewId, message });
  });
});

/* * * * * * * * * * * * *
 * UPDATE RESTAURANT     *
 * * * * * * * * * * * * */
app.put('/restaurant/:id', (req, res) => {
  const { id } = req.params;
  producerUpdate.send({ id });

  // UPDATE isnt in documentation
  res.send({ name, message: 'Updating restaurant...' });
});

/* * * * * * * * * * * * *
 * DELETE RESTAURANT     *
 * * * * * * * * * * * * */
app.delete(`/restaurant/:id`, async (req, res) => {
  const { id } = req.params;
  //get id for restraurant
  let message = 'Successfully deleted restaurant';
  //default message that res was deleted
  const remove = await Restaurant.findByIdAndRemove(id, { useFindandModify: false }).exec();
  //delete from data base

  if (!remove) message = 'Unable to remove restaurant';
  //message if the delete failed

  //send back responses
  res.status(200).send({
    message,
    restaurant: removed,
  });
});

app.listen(port, () => console.log(`RESTAURANT: ${port}!`));
