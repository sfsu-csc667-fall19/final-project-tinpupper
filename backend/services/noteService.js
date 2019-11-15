require('dotenv').config();
// require('./websocket');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const { json, urlencoded } = require('body-parser');
const connect = require('../mongo/connect');
const {
  addNote,
  cookiesNotNull,
  authenticate,
  removeNote,
  getNote,
  getNotes,
  updateNote,
} = require('../note/note.controller');

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan());

const port = 3001;

const mongoUrl = 'mongodb+srv://john:123@cluster0-c6e3j.mongodb.net/test?retryWrites=true&w=majority';

/* * * * * * * * * * * *
 * CONNECT TO DATABASE *
 * * * * * * * * * * * */
connect(mongoUrl)
  .then(async connection => {
    console.log('Connected to database in notesService');
  })
  .catch(e => {
    console.error('+_+_+_+_+ Failed to connect to database in notesService +_+_+_+_+');
  });

app.use(cookiesNotNull);
app.use(authenticate);

app.get(`/notes/:id`, getNote);
app.get(`/notes`, getNotes);
app.put(`/notes/:id`, updateNote);
app.post(`/notes`, addNote);
app.delete(`/notes/:id`, removeNote);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
