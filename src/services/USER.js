const db = require('../models/index');
import { nanoid } from 'nanoid';
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('./key/pkcs8.key');
const publicKey = fs.readFileSync('./key/publickey.crt');
class Login {
  checkValidUser(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findByPk(username);
        let data;
        if (!user) {
          data = { message: 'wrong username' };
        } else {
          if (user.role == 'customer') {
            if (user.password === password)
              data = { message: 'success', username, role: user.role };
            else data = { message: 'wrong password' };
          } else data = { message: 'wrong username' };
        }
        resolve(data);
      } catch (error) {
        reject({ message: 'server error' });
      }
    });
  }

  CheckAccountAdmin(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findByPk(username);
        let data;
        if (!user) {
          data = { message: 'wrong username' };
        } else {
          if (user.role == 'admin') {
            if (user.password === password)
              data = { message: 'success', username };
            else data = { message: 'wrong password' };
          } else data = { message: 'Account Invalid' };
        }
        resolve(data);
      } catch (error) {
        reject({ message: 'server error' });
      }
    });
  }

  async getInfoAdmin(username) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Admin.findOne({
          attributes: { exclude: ['adminID'] },
          where: { username },
          raw: false, //gộp lại k tách ra
          nest: true,
        });
        resolve(data);
      } catch (error) {
        reject({ message: 'server error info admin' });
      }
    });
  }

  async getInfoUser(username) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Customer.findOne({
          attributes: { exclude: ['customerID'] },
          where: { username },
          raw: false, //gộp lại k tách ra
          nest: true,
        });
        resolve(data);
      } catch (error) {
        reject({ message: 'server error info user' });
      }
    });
  }

  CheckUsernameValid(username) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.User.findAll({
          where: { username, role: 'customer' },
        });
        // if (data.length > 0) resolve(false);
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
  CreateAccountCustomer(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.User.create({
          username,
          password,
          role: 'customer',
        });
        resolve('Success');
      } catch (error) {
        reject('Fail');
      }
    });
  }
  CreateInfoCustomer(username, fullName, email, phone, gender) {
    return new Promise(async (resolve, reject) => {
      try {
        var customerID = nanoid(10);
        let data = await db.Customer.create({
          customerID,
          username,
          fullName,
          email,
          phone,
          gender,
        });
        resolve('Success');
      } catch (error) {
        reject('Fail');
      }
    });
  }
}

module.exports = new Login();
