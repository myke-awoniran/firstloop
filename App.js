const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const app = require('express')();
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const hpp = require('hpp');
const mongoSanitize = require('express-mongo-sanitize');
const version1 = require('./src/versions/version1');
const App = require('./src/controllers/App/appController');
const errHandler = require('./src/controllers/err/Global Error/Global_error_handler');

app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('combined'));
app.use(bodyParser.json({ limit: '10kb' }));
app.use(hpp());

app.get('/', App.HttpHomeController);

//HANDLING VERSIONS
app.use(version1);

//unhandled routes
app.use('*', App.HttpHandleUndefinedRoutes);

//global express error handler
app.use(errHandler);

module.exports = app;
