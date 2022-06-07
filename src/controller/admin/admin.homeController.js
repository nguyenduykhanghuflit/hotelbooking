const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');

const jwt = require('jsonwebtoken');

class AdminHomeController {
  // trang chủ
  async Home(req, res) {
    res.render('admin/home.ejs');
    // res.render('admin/home.ejs', { data: data, layout: false });
  }
}
module.exports = new AdminHomeController();
