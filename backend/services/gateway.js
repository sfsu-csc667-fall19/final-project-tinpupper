const express = require('express');
const httpProxy = require('http-proxy');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

const port = process.env.PORT || 3004;
const domain = process.env.DOMAIN || '';
const NODE_ENV = process.env.NODE_ENV || 'dev';

// For re-directing
const apiProxy = httpProxy.createProxyServer();

app.use(cors());

app.use(cookieParser());

/* * * * * * * * * *
 * ERROR           *
 * * * * * * * * * */
apiProxy.on('error', (err, req, res) => {
  console.log(err);
  res.status(400).send({
    error: err,
    message:
      'Gateway errored out. Did you start the redis server? Start up redis and restart pm2.',
  });
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
 * REGISTER        *
 * * * * * * * * * */
app.all(`/register`, (req, res) => {
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
 * FILE SERVER     *
 * * * * * * * * * */
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
