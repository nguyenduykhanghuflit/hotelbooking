const { response } = require('express');
const e = require('express');
const db = require('../models/index');
const CRUD = require('../services/CRUD');
class HomeController {
  async Index(req, res) {
    let data = await CRUD.getAllTestData();
    res.render('home/home.ejs', { data: data });
  }
}
module.exports = new HomeController();
