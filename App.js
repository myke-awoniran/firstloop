const express = require('express');
const { rmSync } = require('fs');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

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

module.exports = app;
