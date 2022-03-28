const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const productsRouter = require('./routes/products');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/.netlify/functions/api', productsRouter);

module.exports.handler = serverless(app);
