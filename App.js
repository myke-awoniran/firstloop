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

// SECURITY MIDDLEWARE
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10kb' }));
app.use(hpp());

app.use(App.Logger);

//HANDLING HOME ROUTE
app.get('/', App.HttpHomeController);

//HANDLING VERSIONS
app.use(version1);

// UNHANDLED ROUTES
app.use('*', App.HttpHandleUndefinedRoutes);

//GLOBAL ERROR HANDLER
app.use(errHandler);

module.exports = app;
