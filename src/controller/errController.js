const { response } = require('express');
const e = require('express');

// Service dùng để xử lý các CRUD cơ bản ở database
const CRUD = require('../services/CRUD');
// Service dùng để xử lý thông tin user
const USER = require('../services/USER');
const jwt = require('jsonwebtoken');

class ErrorController {
  async Err(req, res) {
    let err = req.params['err'];
    res.send(err);
  }
}
module.exports = new ErrorController();
