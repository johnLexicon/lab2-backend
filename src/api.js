const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const serverless = require('serverless-http');
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Middleware which adds a cookie method to the response object.
const productsRouter = require('./routes/products');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');

const app = express();

// MIDDLEWARE
app.use(express.json()); // Middleware that parses json data to javascript objects.
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// ROUTES
app.use('/.netlify/functions/api/products', productsRouter);
app.use('/.netlify/functions/api/auth', authRouter);
app.use('/.netlify/functions/api/users', userRouter);

/*---- Middleware for error handling ------*/

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    errors: {
      message: err.message || 'Internal Server Error'
    }
  });
});

/*---------  mongoose settings ------------*/

mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to Mongo Database');
  })
  .catch((err) => {
    console.log(err.message);
  });

mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

module.exports.handler = serverless(app);
