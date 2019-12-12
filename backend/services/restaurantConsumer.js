const express = require('express');
const axios = require('axios');
const redis = require('redis');
const app = express();
const connect = require('../mongo/connect');
const Restaurant = require('../models/restaurant.model');
const KafkaConsumer = require('../helpers/KafkaConsumer');
const { RESTAURANT_DELETE, RESTAURANT_POST, RESTAURANT_UPDATE } = require('../helpers/KafkaTopicNames');

/* * * * * * * * * * * * * * * *
 * REDIS for publishing message
 * * * * * * * * * * * * * * * */
const redisOptions = {
  host: process.env.REDISHOST || 'localhost',
  port: process.env.PORT || 6379,
};

const client = redis.createClient(redisOptions);

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

const consumerPost = new KafkaConsumer([RESTAURANT_POST]);
const consumerDelete = new KafkaConsumer([RESTAURANT_DELETE]);
const consumerUpdate = new KafkaConsumer([RESTAURANT_UPDATE]);

// .on() from EventEmitter
consumerPost.on('message', message => {
  console.log('CONSUMER_POST_RESTAURANT: ', message);
  console.log('Posting to database...');
  const data = JSON.parse(message.value);

  Restaurant.create(
    { name: data.name, description: data.description, ownerId: data.ownerId, imageUrl: data.imageUrl },
    (err, res) => {
      if (err) {
        console.error('Unable to post restaurant');
      } else {
        axios.post('http://user:3010/user/updateRestaurant', {
          userId: data.ownerId,
          restaurantId: res._id,
          username: data.username,
          password: data.password,
        });
        console.log('* * * * * * * * * * * *');
        console.log('Created restaurant: ', data.name);
        console.log('Restaurant description: ', data.description);
        console.log('* * * * * * * * * * * *');

        // Publish to Redis. WebSocket will listen and then send message to clients.
        client.publish('updateRestaurant', 'updateRestaurant');
      }
    },
  );
});

consumerDelete.on(
  'message',
  message => {
    console.log('CONSUMER_DELETE_RESTAURANT: ', message);
    console.log('Deleting from database...');
    const data = JSON.parse(message.value);

    const remove = Restaurant.findByIdAndRemove(data.id, {
      useFindAndModify: false,
    });
  },
  (err, res) => {
    if (err) {
      console.error('Unable to delete restaurant');
    } else {
      console.log('* * * * * * * * * * * *');
      console.log('Deleted restaurant: ', data.id);
      console.log('* * * * * * * * * * * *');
    }
  },
);

consumerUpdate.on('message', message => {
  console.log('CONSUMER_UPDATE_RESTAURANT: ', message);
  console.log('Updating from database...');
  const data = JSON.parse(message.value);

  const updated = Restaurant.findByIdAndUpdate(data.id, { name: data.name }, { new: true }, (err, res) => {
    if (err) {
      console.error('Unable to update restaurant');
    } else {
      console.log('* * * * * * * * * * * *');
      console.log('Updated restaurant: ', data.id);
      console.log('* * * * * * * * * * * *');
    }
  });
});

consumerPost.connect();
consumerUpdate.connect();
consumerDelete.connect();

app.listen(5151, () => console.log('restaurantConsumer is active on port 5151'));
