require('dotenv').config();
const express = require('express');
const httpProxy = require('http-proxy');
const server = require('http');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
// const { onProxyError, loginAuth, register, fileServer, user, notes, restaurant } = require('./gateway.controller');

const NODE_ENV = process.env.NODE_ENV || 'dev';

console.log(`NODE ENV: ${NODE_ENV}`);

const app = express();
const appServer = server.createServer(app); // Move app to this because we need access to .on() function?
const apiProxy = httpProxy.createProxyServer(app); // Why take in app as argument

const port = process.env.PORT || 3004;

//
const wsProxy = httpProxy.createProxyServer({
  target: process.env.WEBSOCKET_HOST || 'http://localhost:6000',
  ws: true,
});

/**
 * TO IMPLEMENT:
 * 1) WebSocket realtime
 *  - Restaurant gets updated
 *  - Gets sent to everyone on website listening to websocket
 *  - Notification gets triggered (only works for restaurant updates)
 *  - Main page pushes new changes onto the site
 *
 * 2) Kafka
 *  - Business post restaurant data
 *  - Gateway -> Auth (allowed to post?)
 *    -> Producer: send inside route (req,res) (3 partition) -> Consumer: Seperate server handles this? (new file) ( /api/rest .post() )
 *
 * 3) Redis (same)
 */

app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

/* * * * * * * * * * * *
 * PROXY ERROR         *
 * * * * * * * * * * * */
apiProxy.on('error', (err, req, res) => {
  console.log('* * * * * * * * * * * * * * * * *');
  console.log('* GATEWAY: apiProxy errored out *');
  console.log('* * * * * * * * * * * * * * * * *');
  console.log(err);
  res.status(500).send({
    error: err,
    message: 'Gateway errored out. Contact backend team.',
  });
});

wsProxy.on('error', (req, res, socket) => {
  console.log('* * * * * * * * * * * * * * * * *');
  console.log('* GATEWAY: wsProxy errored out  *');
  console.log('* * * * * * * * * * * * * * * * *');
  console.log(err);
  socket.end();
});

/* * * * * * * * * *
 * NOTE SERVICE    *
 * * * * * * * * * */
app.all(`/notes*`, (req, res) => {
  console.log(req.cookies);
  console.log(req.path);
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: 'http://notes:3001',
    });
  } else {
    apiProxy.web(req, res, {
      target: 'http://localhost:3001',
    });
  }
});

/* * * * * * * * * *
 * REVIEW SERVICE    *
 * * * * * * * * * */
app.all(`/review*`, (req, res) => {
  console.log(req.cookies);
  console.log(req.path);
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: 'http://review:3013',
    });
  } else {
    apiProxy.web(req, res, {
      target: 'http://localhost:3013',
    });
  }
});

/* * * * * * * * * *
 * LOGIN/AUTH      *
 * * * * * * * * * */
app.all(`/auth*`, (req, res) => {
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: 'http://auth:3002',
    });
  } else {
    apiProxy.web(req, res, {
      target: 'http://localhost:3002',
    });
  }
});

/* * * * * * * * * *
 * USER    *
 * * * * * * * * * */
app.all(`/user*`, (req, res) => {
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: 'http://user:3010',
    });
  } else {
    apiProxy.web(req, res, {
      target: 'http://localhost:3010',
    });
  }
});

/* * * * * * * * * *
 * REGISTER        *
 * * * * * * * * * */
app.all(`/register*`, (req, res) => {
  console.log(req.path);
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: 'http://register:3006',
    });
  } else {
    apiProxy.web(req, res, {
      target: 'http://localhost:3006',
    });
  }
});

/* * * * * * * * * *
 * RESTAURANT      *
 * * * * * * * * * */
app.all(`/restaurant*`, (req, res) => {
  console.log(req.path);
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: 'http://restaurant:3012',
    });
  } else {
    apiProxy.web(req, res, {
      target: 'http://localhost:3012',
    });
  }
});

/* * * * * * * * * *
 * USER            *
 * * * * * * * * * */
app.all(`/user*`, (req, res) => {
  console.log(req.path);
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: 'http://user:3010',
    });
  } else {
    apiProxy.web(req, res, {
      target: 'http://localhost:3010',
    });
  }
});

// /* * * * * * * * * *
//  * FILE SERVER     *
//  * * * * * * * * * */
app.all('*', (req, res) => {
  // front end server / react
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: 'http://fileServer:4000',
    });
  } else {
    apiProxy.web(req, res, {
      target: 'http://localhost:4000',
    });
  }
});

app.listen(port, () => console.log(`Gateway on port ${port}!`));
