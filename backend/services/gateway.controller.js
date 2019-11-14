require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV || 'dev';

/* * * * * * * * * * * *
 * PROXY ERROR         *
 * * * * * * * * * * * */
const onProxyError = (err, req, res) => {
  console.log('* * * * * * * * * * * * * * * * *');
  console.log('* GATEWAY: apiProxy errored out *');
  console.log('* * * * * * * * * * * * * * * * *');
  console.log(err);
  res.status(400).send({
    error: err,
    message: 'Gateway errored out. Contact backend team.',
  });
};

/* * * * * * * * * *
 * NOTE SERVICE    *
 * * * * * * * * * */
const notes = (req, res) => {
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
};

/* * * * * * * * * *
 * LOGIN/AUTH      *
 * * * * * * * * * */
const loginAuth = (req, res) => {
  if (NODE_ENV === 'prod') {
    apiProxy.web(req, res, {
      target: 'http://auth:3002',
    });
  } else {
    apiProxy.web(req, res, {
      target: 'http://localhost:3002',
    });
  }
};

/* * * * * * * * * *
 * REGISTER        *
 * * * * * * * * * */
const register = (req, res) => {
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
};

// /* * * * * * * * * *
//  * FILE SERVER     *
//  * * * * * * * * * */
const fileServer = (req, res) => {
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
};

module.exports = {
  onProxyError,
  loginAuth,
  register,
  notes,
  fileServer,
};
