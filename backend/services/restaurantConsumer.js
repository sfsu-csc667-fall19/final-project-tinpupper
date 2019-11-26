const express = require('express');
const app = express();
const connect = require('../mongo/connect');
const Restaurant = require('../models/restaurant.model');
const KafkaConsumer = require('../helpers/KafkaConsumer');

const mongoUrl = 'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

/* * * * * * * * * * * *
 * CONNECT TO DATABASE *
 * * * * * * * * * * * */
connect(mongoUrl)
  .then(async connection => {
    console.log('Connected to database in restaurantConsumer');
  })
  .catch(e => {
    console.error('+_+_+_+_+ Failed to connect to database in restaurantConsumer +_+_+_+_+');
  });

const consumer = new KafkaConsumer(['restaurant']);

// .on() from EventEmitter
consumer.on('message', message => {
  console.log('RECIEVED MESSAGE: ', message);
  console.log('Pretending to do post the data to database...');
  const data = JSON.parse(message.value);

  Restaurant.create({ name: data.name }, (err, res) => {
    if (err) {
      console.error('Unable to post restaurant');
    } else {
      console.log('Created restaurant');
    }
  });
});

consumer.connect();

app.listen(5151, () => console.log('restaurantConsumer is active on port 5151'));
