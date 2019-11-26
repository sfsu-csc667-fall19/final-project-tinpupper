const express = require('express');
const httpProxy = require('http-proxy');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const { onProxyError, loginAuth, register, fileServer, user, notes, restaurant } = require('./gateway.controller');

const app = express();
const port = process.env.PORT || 3004;
const apiProxy = httpProxy.createProxyServer();

app.use(cors());
app.use(cookieParser());
app.use(morgan('dev'));

apiProxy.on('error', onProxyError);
app.all(`/notes*`, notes);
app.all(`/auth*`, loginAuth);
app.all(`/register*`, register);
app.all(`/restaurant*`, restaurant);
app.all(`/user*`, user);
// app.all('*', fileServer);

app.listen(port, () => console.log(`Gateway on port ${port}!`));
