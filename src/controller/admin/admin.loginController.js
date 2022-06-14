const { response } = require('express');
const e = require('express');
const ADMIN = require('../../services/ADMIN');
const USER = require('../../services/USER');
const jwt = require('jsonwebtoken');

const fs = require('fs');
const privateKey = fs.readFileSync('./key/pkcs8.key');
const publicKey = fs.readFileSync('./key/publickey.crt');

class AdminLoginController {
  // [Controller]
  async Login(req, res) {
    let token = req.cookies.tokenAdmin;
    if (token) {
      try {
        //neu co token thi verify no ra
        let deccoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });

        //-----------get preUrl---------
        let preUrlAdmin = req.cookies.preUrlAdmin;
        if (preUrlAdmin) {
          try {
            let url = jwt.verify(preUrlAdmin, 'preUrlAdmin');
            res.redirect(url);
          } catch (error) {
            return res.send('URL Failed');
          }
          return;
        } else return res.redirect('/admin');
        //-----------get preUrl---------
      } catch {
        //token da bi thay doi || het han
        console.log('Token invalid');
        res.clearCookie('preUrl');
        res.clearCookie('token');
        return res.render('admin/login.ejs', { layout: false });
      }
    } else return res.render('admin/login.ejs', { layout: false });
  }
  //[API]: xử lý login
  async HandleLogin(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    // // kiểm tra username và password
    let result = await USER.CheckAccountAdmin(username, password);
    let response;

    if (result.message == 'success') {
      // generate token
      let token = jwt.sign(result, privateKey, { algorithm: 'RS256' });
      //lưu token vào cookie
      res.cookie('tokenAdmin', token, {
        expires: new Date(Date.now() + 900000),
      });
      response = { message: 'success' };
    }

    if (
      result.message == 'wrong username' ||
      result.message == 'wrong password' ||
      result.message == 'Account Invalid'
    )
      response = result;

    return res.send(response);
  }
  //[Middleware]: kiểm tra đăng nhập
  // [POST]: check login
  async CheckLogin(req, res, next) {
    let token = req.cookies.tokenAdmin;
    if (token) {
      try {
        let deccoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
        return next();
      } catch (err) {
        console.log('token da bi thay doi');
        return res.redirect('/admin/login');
      }
    } else {
      let preUrlAdmin = jwt.sign(req.originalUrl, 'preUrlAdmin');
      res.cookie('preUrlAdmin', preUrlAdmin, {
        expires: new Date(Date.now() + 90000000000),
      });

      return res.redirect('/admin/login');
    }
  }

  //[GET]: /logout
  async Logout(req, res) {
    res.clearCookie('preUrlAdmin');
    res.clearCookie('tokenAdmin');
    res.redirect('/admin');
  }
}
module.exports = new AdminLoginController();
