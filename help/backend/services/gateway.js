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

const app = express(); // for using app.all
const appServer = server.createServer(app); // appServer since we need access to .on('upgrade')
const apiProxy = httpProxy.createProxyServer(app); // used inside the .all as apiProxy.web

const port = process.env.PORT || 3004;

// If someone ws://localhost:3004 it also moves them there?
// Without using route, but both works
const wsProxy = httpProxy.createProxyServer({
  target: `http://${process.env.WEBSOCKET_HOST}:${process.env.WEBSOCKET_PORT}` || 'http://localhost:6100',
  ws: true,
});

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

wsProxy.on('error', (err, res, socket) => {
  console.log('* * * * * * * * * * * * * * * * *');
  console.log('* GATEWAY: wsProxy errored out  *');
  console.log('* * * * * * * * * * * * * * * * *');
  console.log(err);
  console.log(res);
  console.log(socket);
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
 * WEBSOCKET       *
 * * * * * * * * * */
app.all(`/websocket*`, (req, res) => {
  console.log(req.path);
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: `http://websocket:${process.env.WEBSOCKET_PORT}`,
    });
  } else {
    apiProxy.web(req, res, {
      target: `http://localhost:${process.env.WEBSOCKET_PORT}`,
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

/* * * * * *
 * UPGRADE *
 * * * * * */
appServer.on('upgrade', (req, socket, head) => {
  console.log('*****************');
  console.log('upgrade ws here');
  console.log('*****************');
  wsProxy.ws(req, socket, head);
});

appServer.listen(port, () => console.log(`Gateway on port ${port}!`));
