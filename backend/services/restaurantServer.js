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
 * GET RESTAURANT        *
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
    reviews: [1, 2, 3], // The user ids of those who left reviews
  });
});

/* * * * * * * * * * * * *
 * POST RESTAURANT       *
 * * * * * * * * * * * * */
app.post(`/restaurant`, (req, res) => {
  const { name } = req.body;
  producerPost.send({ name });
  res.send({ name, message: 'Creating restaurant...' });
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
app.delete(`/restaurant/:id`, (req, res) => {
  /**
   * Check the backend documentation on our team's GitHub on how the body is received and how to respond
   *
   * 1) Get the restaurant's id from req.params
   * 2) Delete this from the database using this function
   *    - Restaurant.findByIdAndRemove( id, func(err, res) )
   *    - Go to /backend/services/userService.js and CTRL+F "User.findByIdAndRemove" for an example usage
   * 3) Send back responses properly (see documentation in RESTAURANT section for DELETE method)
   */
  res.send('need to make');
});

app.listen(port, () => console.log(`RESTAURANT: ${port}!`));
