const express = require('express');
const httpProxy = require('http-proxy');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {
  onProxyError,
  loginAuth,
  register,
  fileServer,
  user,
  notes,
} = require('./gateway.controller');

const app = express();
const port = process.env.PORT || 3004;
const apiProxy = httpProxy.createProxyServer();

app.use(cors());
app.use(cookieParser());

apiProxy.on('error', onProxyError);
app.all(`/notes*`, notes);
app.all(`/auth*`, loginAuth);
app.all(`/register`, register);
app.all(`/user*`, user);
// app.all('*', fileServer);

app.listen(port, () => console.log(`Gateway on port ${port}!`));
