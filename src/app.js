const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');
require('dotenv').config();

const middleware = require('./middleware');
const api = require('./api');

// Creat express app
const app = express();
// for rate-limiting
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
app.enable('trust proxy');

// add middleware for app
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());

// add routes here
app.get('/', (req, res) => {
  res.json({
    message: 'Hye!!! its working',
  });
});

app.use('/api/v1', api);

// error handling middlewares
app.use(middleware.notFound);
app.use(middleware.errorHandler);

module.exports = app;
