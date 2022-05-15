const { response } = require('express');
const e = require('express');

const USER = require('../services/USER');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./key/pkcs8.key');
const publicKey = fs.readFileSync('./key/publickey.crt');

class AuthenController {
  //[GET]: /login

  async Login(req, res) {
    let token = req.cookies.token;
    try {
      let deccoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
      if (deccoded) {
        // lấy url trước đó
        let preUrl = req.cookies.preUrl;
        //nếu có sẽ chuyển hướng, không có sẽ về home
        if (preUrl) {
          // giải mã nó ra
          try {
            let url = jwt.verify(preUrl, 'preUrl');
            res.clearCookie('preUrl');
            res.redirect(url);
          } catch (error) {
            res.send('url lỗi');
          }
        }
        //không có sẽ về
        res.redirect('/');
      }
    } catch (err) {
      res.render('login.ejs', { layout: false });
    }
  }

  //[POST]: handle login request
  async HandleLogin(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // kiểm tra username và password
    let result = await USER.checkValidUser(username, password);
    let response;

    if (result.message == 'success') {
      // generate token
      let token = jwt.sign(result, privateKey, { algorithm: 'RS256' });
      //lưu token vào cookie
      res.cookie('token', token, { expires: new Date(Date.now() + 900000) });
      response = { message: 'success' };
    }

    if (
      result.message == 'wrong username' ||
      result.message == 'wrong password'
    )
      response = result;
    res.send(response);
  }

  // [POST]: check login
  async CheckLogin(req, res, next) {
    let token = req.cookies.token;
    try {
      let deccoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
      if (deccoded) return next();
    } catch (err) {
      let preUrl = jwt.sign(req.originalUrl, 'preUrl');
      res.cookie('preUrl', preUrl, { expires: new Date(Date.now() + 900000) });
      res.redirect('/login');
    }
  }

  async GetInfoUser(req, res) {
    let token = req.cookies.token;
    try {
      let deccoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
      if (deccoded) {
        let username = deccoded.username;
        let role = deccoded.role;
        let info;
        if (role == 'admin') info = await USER.getInfoAdmin(username);
        else info = await USER.getInfoUser(username);
        res.send({ message: 'logged', info });
      }
    } catch (err) {
      res.send(console.error(err));
    }
  }
}

module.exports = new AuthenController();
