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

  GetAllBookingByUsername(username) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Booking.findAll({
          where: { username },
          raw: false, //gộp lại k tách ra
          nest: true,
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: db.Room,
              as: 'bookingData',
              raw: false, //gộp lại k tách ra
              nest: true,
              include: [
                {
                  model: db.Type,
                  as: 'roomData',
                  raw: false, //gộp lại k tách ra
                  nest: true,
                  include: [
                    {
                      model: db.Image,
                      as: 'imgData',
                      raw: false, //gộp lại k tách ra
                      nest: true,
                    },
                  ],
                },
              ],
            },
          ],
        });
        resolve(data);
      } catch (error) {
        reject({ message: 'server error info admin' });
      }
    });
  }

  getBillByBookingID(bookingID) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Booking.findByPk(bookingID);
        resolve(data);
      } catch (error) {
        reject({ message: 'server error info admin' });
      }
    });
  }
  UpdateBooking(bookingID, stt) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Booking.update(
          { status: stt },
          {
            where: {
              bookingID,
            },
          }
        );
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }

  async getInfoCustomer(username) {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Customer.findOne({
          attributes: { exclude: ['customerID'] },
          where: { username },
          raw: false, //gộp lại k tách ra
          nest: true,
          include: [
            {
              model: db.User,

              as: 'info',
              raw: false, //gộp lại k tách ra
              plain: true,
            },
          ],
        });
        resolve(data);
      } catch (error) {
        reject({ message: 'server error info user' });
      }
    });
  }

  UpdateInfoCustomer(username, fullName, email, phone, password) {
    return new Promise(async (resolve, reject) => {
      try {
        await db.Customer.update(
          { fullName, email, phone },
          {
            where: {
              username,
            },
          }
        );
        await db.User.update(
          { password },
          {
            where: {
              username,
            },
          }
        );
        resolve(true);
      } catch (error) {
        reject(false);
      }
    });
  }
}

module.exports = new Login();
