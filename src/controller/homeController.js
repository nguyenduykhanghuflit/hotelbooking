const { response } = require('express');
const e = require('express');

// Service dùng để xử lý các CRUD cơ bản ở database
const CRUD = require('../services/CRUD');
// Service dùng để xử lý thông tin user
const USER = require('../services/USER');
const jwt = require('jsonwebtoken');

class HomeController {
  async data(req, res) {
    res.render('client/home.ejs', { layout: false });
  }
  async Location(req, res) {
    res.render('client/location.ejs', { layout: false });
  }
  async Hotel(req, res) {
    res.render('client/hotel.ejs', { layout: false });
  }
  // trang chủ
  async Home(req, res) {
    // let data = await CRUD.getAllTestData();
    let token = req.cookies.token;
    let data;
    try {
      var decoded = jwt.verify(token, 'ok');
      if (decoded) {
        // data = { login: true };
        // data = decoded;ReturnInfoUser
        let username = decoded.userName;
        let info = await login.getInfoUser(username);
        data = { login: true, info: { name: info.fullName } };
      }
    } catch (err) {
      data = { login: false };
    }
    res.render('client/home.ejs', { data: data, layout: false });
    // res.send(data);
  }
}
module.exports = new HomeController();
