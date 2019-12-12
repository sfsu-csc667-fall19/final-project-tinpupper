require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const connect = require('../mongo/connect');
const User = require('../models/user.model');
const { cookiesNotNull, authenticate } = require('../note/note.controller');

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3010;

const mongoUrl = 'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

/* * * * * * * * * * * *
 * CONNECT TO MONGODB  *
 * * * * * * * * * * * */
connect(mongoUrl)
  .then(async connection => {
    console.log('Connected to database in registerService');
  })
  .catch(e => {
    console.error('+_+_+_+_+ Failed to connect to database in registerService +_+_+_+_+');
  });

// app.use(cookiesNotNull);
// app.use(authenticate);

app.use(morgan());

/* * * * * * * * * * * * * * * * * * * * * * * * * * *
 * REGISTER USER (NOT USED; LOOK AT REGISTERSERVER)   *
 * * * * * * * * * * * * * * * * * * * * * * * * * * */
// app.post('/user', (req, res) => {
//   res.send('Use /register route for registation');
// });

/* * * * * * * * * * * *
 * UPDATE SINGLE USER  *
 * * * * * * * * * * * */
app.put('/user/:id', async (req, res) => {
  let message = 'Updated user';
  const { id } = req.params;
  //gets user's id
  const { username } = req.body;
  //and username from body
  const updated = await User.findByIdAndUpdate(id, { username }, { new: true });
  //finds user by id and updates the username
  if (!updated) message = 'Unable to update user';

  //if update failed - message
  res.status(200).send({
    //response sent to front end
    message,
    user: updated,
  });
});

/* * * * * * * * * *
 * GET SINGLE USER *
 * * * * * * * * * */
app.get('/user/:id', async (req, res) => {
  let message = 'Received user';
  const { id } = req.params;
  //gets user id
  const received = await User.findById(id).exec();
  //finds user fromn id variable -> received
  if (!received) message = `User does not exist for ${id}`;
  //error message if not received
  res.status(200).send({
    message,
    users: received,
  });
});

/* * * * * * * * * *
 * GET ALL USERS   *
 * * * * * * * * * */
app.get('/user', async (req, res) => {
  let message = 'Successfully received all users';
  const received = await User.find({}).exec();
  //gets every user from the database

  if (!received) message = 'Unable to get all users';

  res.status(200).send({
    message,
    user: received,
  });
});

/* * * * * * * * * *
 * PRIVATE POST: update review user  *
 * * * * * * * * * */
app.post('/user/updateReview', (req, res) => {
  console.log('inside user/addReview');
  const { userId, reviewId } = req.body;

  let message = 'Updated user with new reviewId';

  User.update({ _id: userId }, { $push: { reviewIds: reviewId } }, (err, result) => {
    console.log('RESULT: ', result);
    console.log('ERR: ', err);
    if (err) message = 'Unable to updated review for USER';
    res.send({ userId, reviewId, message });
  });
});

/* * * * * * * * * *
 * PRIVATE POST: update restaurant for business user  *
 * * * * * * * * * */
app.post('/user/updateRestaurant', (req, res) => {
  console.log('inside user/updateRestaurant');
  const { userId, restaurantId } = req.body;

  let message = 'Updated user with new restaurantId';

  User.update({ _id: userId }, { $push: { restaurantIds: restaurantId } }, (err, result) => {
    console.log('RESULT: ', result);
    console.log('ERR: ', err);
    if (err) message = 'Unable to updated RESTAURANT for USER';
    res.send({ userId, restaurantId, message });
  });
});

/* * * * * * * * * *
 * DELETE USER     *
 * * * * * * * * * */
app.delete('/user/:id', async (req, res) => {
  let message = 'Successfully deleted user';
  const { id } = req.params;
  //get id
  const remove = await User.findByIdAndRemove(id, {
    useFindandModify: false,
  }).exec();
});

app.listen(port, () => console.log(`userService app listening on port ${port}!`));
