const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan());

// Static file react server
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
  //   res.sendFile(path.join(__dirname, 'build/index.html'));
  res.send('Dont forget to setup fileServer for front end');
});

app.listen(4000);
