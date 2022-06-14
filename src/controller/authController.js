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
    //neu co token
    if (token) {
      try {
        //neu co token thi verify no ra
        let deccoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });

        //-----------get preUrl---------
        let preUrl = req.cookies.preUrl;
        if (preUrl) {
          try {
            let url = jwt.verify(preUrl, 'preUrl');
            res.redirect(url);
          } catch (error) {
            return res.send('URL Failed');
          }
          return;
        } else return res.redirect('/');
        //-----------get preUrl---------
      } catch {
        //token da bi thay doi || het han
        console.log('Token invalid');
        res.clearCookie('preUrl');
        res.clearCookie('token');
        return res.redirect('/login');
      }
    } else return res.render('login.ejs', { layout: false });
  }

  async Register(req, res) {
    return res.render('register.ejs', { layout: false });
  }

  //[GET]: /logout
  async Logout(req, res) {
    res.clearCookie('preUrl');
    res.clearCookie('token');
    res.redirect('/');
  }

  //[POST]: handle login request
  async HandleLogin(req, res) {
    let username = req.body.data.username;
    let password = req.body.data.password;

    // kiểm tra username và password
    let result = await USER.checkValidUser(username, password);
    let response;

    if (result.message == 'success') {
      // generate token
      let token = jwt.sign(result, privateKey, { algorithm: 'RS256' });
      //lưu token vào cookie
      res.cookie('token', token, {
        expires: new Date(Date.now() + 900000),
      });
      response = { message: 'success' };
    }

    if (
      result.message == 'wrong username' ||
      result.message == 'wrong password'
    )
      response = result;

    return res.json(response);
  }

  //[POST]: handle register request
  async HandleRegister(req, res) {
    let data = req.body.data;
    let username = data.username;
    let password = data.password;
    let fullName = data.fullName;
    let gender = data.gender;
    let email = data.email;
    let phone = data.phone;
    if (!username || !password || !fullName || !gender || !email || !phone)
      res.send('Data Invalid');
    else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      res.send('Email Invalid');
    } else if (!/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone)) {
      res.send('Phone Invalid');
    } else {
      let checkUsername = await USER.CheckUsernameValid(username);
      let l = checkUsername.length;
      if (l > 0) {
        res.send('User Invalid');
      } else {
        let create = await USER.CreateAccountCustomer(username, password);
        if (create != 'Success') res.send('Fail');
        else {
          let info = await USER.CreateInfoCustomer(
            username,
            fullName,
            email,
            phone,
            gender
          );
          if (info != 'Success') res.send('Fail');
        }

        res.send('Success');
      }
    }
  }
  // kiểm tra username và password

  // [POST]: check login
  async CheckLogin(req, res, next) {
    let token = req.cookies.token;
    if (token) {
      try {
        let deccoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
        return next();
      } catch (err) {
        console.log('token da bi thay doi');
        return res.redirect('/login');
      }
    } else {
      let preUrl = jwt.sign(req.originalUrl, 'preUrl');
      res.cookie('preUrl', preUrl, {
        expires: new Date(Date.now() + 90000000000),
      });

      return res.redirect('/login');
    }
  }

  // [POST] chắc chắn có token neu token thay doi se bi login lai
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
        return res.send({ message: 'logged', info });
      }
    } catch (err) {
      console.log('token da bi thay doi');
      return res.redirect('/login');
    }
  }

  async ReturnInfoUser(req, res) {
    let token = req.cookies.token;
    try {
      let deccoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
      if (deccoded) {
        let username = deccoded.username;
        let role = deccoded.role;
        let info;
        if (role == 'admin') info = await USER.getInfoAdmin(username);
        else info = await USER.getInfoUser(username);
        return res.send(info);
      }
    } catch (err) {
      console.log('token da bi thay doi');
      return res.redirect('/login');
    }
  }
}

module.exports = new AuthenController();
