const express = require('express');
const analyze = require('../routes/analyze');
const error = require('../middleware/error');

module.exports = (app) => {
  app.use(express.json());
  app.use('/analyze', analyze);
  app.use(express.urlencoded({ extended: true }));
  app.use(error);
};
