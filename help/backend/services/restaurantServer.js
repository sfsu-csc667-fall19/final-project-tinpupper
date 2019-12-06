require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connect = require('../mongo/connect');
const Restaurant = require('../models/restaurant.model');
const KafkaProducer = require('../helpers/KafkaProducer');
const { RESTAURANT_DELETE, RESTAURANT_POST, RESTAURANT_UPDATE } = require('../helpers/KafkaTopicNames');

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

/* * * * * * * * * * * * *
 * POST RESTAURANT       *
 * * * * * * * * * * * * */
app.post(`/restaurant`, (req, res) => {
  const { name, description, ownerId } = req.body;
  const imageUrl =
    'https://cdn2.atlantamagazine.com/wp-content/uploads/sites/4/2019/07/RestaurantEugene01_courtesy.jpg';
  producerPost.send({ name, description, ownerId, imageUrl });
  res.send({ ownerId, name, description, imageUrl, message: 'Creating restaurant...' });
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
