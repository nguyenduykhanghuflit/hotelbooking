const db = require('../models/index');
const CRUD = require('../services/CRUD');
const e = require('express');
const { response } = require('express');

class testController {
  async test(req, res) {
    // let ans = await CRUD.getClass();
    // let dt = await CRUD.getStudent();

    // let data = { ans, dt };

    // res.render('test/index.ejs', { data });
    res.send('oke');
  }
}
module.exports = new testController();
