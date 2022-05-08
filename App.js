const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./config/secret');
const AppError = require('./src/controllers/err/Operational Error/Operational_Error');
const version1 = require('./src/versions/version1');
const errHandler = require('./src/controllers/err/Global Error/Global_error_handler');

const app = express();

app.use(cors());

app.use(helmet());
app.use(morgan('combined'));
app.use(bodyParser.json());

// app.use(
//    session({
//       secret: config.session,
//       resave: true,
//       saveUninitialized: true,
//    })
// );

app.get('/', (req, res, next) => {
   res.status(200).json({
      status: 200,
      message: 'welcome to first-loop chat-app',
   });
});

app.use(version1);

//unhandled routes
app.use('*', (req, res, next) => {
   return next(
      new AppError(`can't find this ${req.originalUrl} on this server`, 404)
   );
});

//global express error handler
app.use(errHandler);

module.exports = app;
