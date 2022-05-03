const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const errHandler = require('./src/controllers/err/errorHandler');
const Error = require('./utils/Error');
const version1 = require('nodemon/lib/version');

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.use('/', (req, res, next) => {
   res.status(200).json({
      status: 200,
      message: 'welcome to first-loop chat-app',
   });
});

app.use(version1);

//unhandled routes
app.use('*', (req, res, next) => {
   return next(
      new Error(`can't find this ${req.originalUrl} on this server`, 404)
   );
});

//global express error handler
app.use(errHandler);

module.exports = app;
