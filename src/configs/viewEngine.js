import express from 'express';
const expressLayouts = require('express-ejs-layouts');

const configViewEngine = (app) => {
  app.use(express.static('./src/public'));
  app.set('view engine', 'ejs');
  app.set('views', './src/views');
  app.use(expressLayouts);
  app.set('layout', 'layouts/defaultLayout');
};

export default configViewEngine;
