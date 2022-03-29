const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const serverless = require('serverless-http');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/.netlify/functions/api/products', productsRouter);

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
