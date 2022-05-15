const db = require('../models/index');
import { nanoid } from 'nanoid';
const { Op } = require('sequelize');
var jwt = require('jsonwebtoken');
class Login {
  checkValidUser(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await db.User.findByPk(username);
        let data;
        if (!user) {
          data = { message: 'wrong username' };
        } else {
          if (user.password === password)
            data = { message: 'success', username, role: user.role };
          else data = { message: 'wrong password' };
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
        reject(error);
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
        reject(error);
      }
    });
  }
}

module.exports = new Login();
