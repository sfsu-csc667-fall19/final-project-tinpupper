const axios = require('axios');
const redis = require('redis');
const Note = require('../models/note.model');

const redisOptions = {
  host: process.env.REDISHOST || 'localhost',
  port: process.env.PORT || 6379,
};

const NODE_ENV = process.env.NODE_ENV || 'dev';

console.log(`Node env in note controller: `, process.env.NODE_ENV);
console.log(`REDIS in note controller: `, redisOptions);

const client = redis.createClient(redisOptions);

/* * * * * * *
 * ADD NOTE  *
 * * * * * * */
const addNote = async (req, res) => {
  console.log('addNote');
  const created = await Note.create({
    text: req.body.text,
  });
  console.log(created);
  res.status(200).send({
    message: 'Successfully posted note',
    notes: created,
  });
};

/* * * * * * * *
 * UPDATE NOTE *
 * * * * * * * */
const updateNote = async (req, res) => {
  let message = 'Updated note';
  const { id } = req.params;
  const { text } = req.body;
  const updated = await Note.findByIdAndUpdate(id, { text }, { new: true });

  if (!updated) message = 'Unable to find the note to update';

  res.status(200).send({
    message,
    notes: updated,
  });
};

/* * * * * * *
 * GET NOTE  *
 * * * * * * */
const getNote = async (req, res) => {
  let message = 'Successfully received note';
  const { id } = req.params;
  const received = await Note.findById(id).exec();

  if (!received) message = `Note does not exist for ${id}`;

  res.status(200).send({
    message,
    notes: received,
  });
};

/* * * * * * *
 * GET NOTES *
 * * * * * * */
const getNotes = async (req, res) => {
  let message = 'Successfully received all notes';
  const received = await Note.find({}).exec();

  if (!received) message = `Unable to get all notes (none exists?)`;

  res.status(200).send({
    message,
    notes: received,
  });
};

/* * * * * * * *
 * REMOVE NOTE *
 * * * * * * * */
const removeNote = async (req, res) => {
  console.log('inside delete note');
  let message = 'Successfully removed note';
  const { id } = req.params;
  const remove = await Note.findByIdAndRemove(id, {
    useFindAndModify: false,
  }).exec();

  if (!remove) message = `Note does not exist for ${id}`;

  res.status(200).send({
    message,
    notes: remove,
  });
};

/**
 * Verifies cookies then body (used for authorization)
 */
const cookiesNotNull = (req, res, next) => {
  console.log('Inside cookiesNotNull middleware');
  req.hasCookies = false;

  console.log('COOKIES: ', req.cookies);
  console.log(`BODY: `, req.body);

  // Invalid cookies
  if (!req.cookies.username || !req.cookies.password) {
    // Continue if they have a body
    if (req.body.username && req.body.password) return next();
    console.error('FAILED COOKIESNOTNULL CHECK', req.body);
    console.error('CHECK COOKIES: ', req.cookies);
    console.log(req.cookies);
    return res.status(400).send({ error: 'No valid cookies or body authorization' });
  }

  req.hasCookies = true;
  return next();
};

/**
 *
 */
const authenticate = (req, res, next) => {
  console.log('Inside authentication middleware');
  console.log(req.cookies);
  let body = {};
  let key;
  if (req.hasCookies) {
    console.log('Has cookies so set key using that information');
    body = {
      username: req.cookies.username,
      password: req.cookies.password,
    };
    // Key for redis
    key = `${req.cookies.username} _ ${req.cookies.password}`;
  } else {
    console.log('No cookies, so use body information instead for key');
    body = {
      username: req.body.username,
      password: req.body.password,
    };
    // Key for redis
    key = `${req.body.username} _ ${req.body.password}`;
  }

  console.log(`Here is the current key: `, key);

  // Verify with REDIS that we have a cached version of this user
  client.get(key, async (err, cachedValue) => {
    console.log(`Error: `, err);
    console.log('cached value is: ', cachedValue);
    // Key exists
    if (cachedValue !== null) {
      console.log('Found key in cache...');
      // Move to next middleware if user info already previously authenticated
      if (cachedValue === 'true') {
        console.log('Moving to next middleware...');
        return next(); // Next middleware
      }
    }

    console.log('Did not find user in cache, so verify with auth server instead');
    // User info doesn't exist in cache, so verify with auth server
    if (NODE_ENV === 'prod') {
      console.log('Before prod');
      const value = await verifyWithAuthServer('auth', next, key, body, res);
      if (value === true) {
        console.log('value true return next middleware');
        return next();
      }
      console.log('VALUE', value);
      return res.send(value);
      console.log('after prod');
    }
    console.log('after prod2');
    return await res.send(verifyWithAuthServer('localhost', next, key, body, res));
  });
};

/* * * * * * * * * * * * *
 * HELPER FOR NODE_ENV   *
 * * * * * * * * * * * * */
const verifyWithAuthServer = async (domain, next, key, body, res) => {
  console.log(`Attemping to verify ${body.username}`);
  return await axios
    .post(`http://${domain}:3002/auth`, body)
    .then(resInner => {
      console.log('res inner postToAuthServer');
      // Auth server said user is valid so return next middleware
      if (resInner.data.valid) {
        console.log(`Valid successful`);
        client.set(key, true);
        return true; // Next middleware
      }

      // Auth server says user is invalid, don't return next middleware
      client.set(key, false);
      // resInner.status(403);
      console.log(`Valid failed`);
      //return resInner.send('Auth server failed to authenticate user');
      return { message: 'Auth server failed to authenticate user' };
    })
    .catch(err => {
      console.log('FAILED TO VERIFY AITH AUTH SERVER');
      console.log(err.response.data);
      // return res.send({
      //   error: err.response.data.error,
      //   valid: false,
      // });
      return {
        error: err.response.data.erorr,
        valid: false,
      };
    });
};

module.exports = {
  addNote,
  cookiesNotNull,
  authenticate,
  removeNote,
  getNote,
  getNotes,
  updateNote,
};
