const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');

const jwt = require('jsonwebtoken');

class AdminHomeController {
  // trang chủ
  async Bill(req, res) {
    res.render('admin/bill.ejs');
    // res.render('admin/home.ejs', { data: data, layout: false });
  }
}
module.exports = new AdminHomeController();
