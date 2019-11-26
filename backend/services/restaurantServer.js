require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const connect = require('../mongo/connect');
const Restaurant = require('../models/restaurant.model');
const KafkaProducer = require('../helpers/KafkaProducer');

const producer = new KafkaProducer('restaurant');

producer.connect(() => {
  console.log('Kafka connected in restaurantServer');
});

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
app.get(`/restaurant/:id`, (req, res) => {
  console.log(`Finding restaurant...`);
  const { id } = req.params;

  Restaurant.findById(id, (err, res) => {
    if (err) {
      console.log('Could not find restaurant...');
      return res.status(400).send({
        error: err.message,
        message: 'Unable to get restaurant',
      });
    }

    console.log('Found restaurant...');
    return res.send({
      message: 'Restaurant found',
      name: res.data.name,
      reviews: [1, 2, 3], // The user ids of those who left reviews
    });
  });
});

/* * * * * * * * * * * * *
 * POST NEW RESTAURANT   *
 * * * * * * * * * * * * */
app.post(`/restaurant`, (req, res) => {
  /**
   * Check the backend documentation on our team's GitHub on how to format the response
   *
   * 1) Get the restaurant's name from req.body
   * 2) Post to database using this function
   *    - Restaurant.create( body, func(err, res) )
   *    - Go to /backend/services/registerServer.js and CTRL+F "User.create" for an example usage
   * 3) Send back responses properly (see documentation in RESTAURANT section for POST method)
   */

  const { name } = req.body;

  /**
   * THIS SHOULD BE MOVED INTO CONSUMER AND LEAVE PRODUCER SEND HERE
   * */
  // Restaurant.create({ name }, (err, res) => {
  //   if (err) {
  //     console.error('Unable to post restaurant');
  //     res.send({ error: err.message, message: 'Unable to post restaurant' });
  //   } else {
  //     // Put restaurant information into kafka topic which triggers consumers
  //     producer.send({ name });
  //   }
  // });
  console.log(producer);

  // restaurantConsumer will handle the post
  producer.send({ name });
  res.send({ name, message: 'Creating restaurant...' });
});

/* * * * * * * * * * * * *
 * DELETE RESTAURANT   *
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
});

app.listen(port, () => console.log(`RESTAURANT: ${port}!`));
