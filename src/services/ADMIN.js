const db = require('../models/index');
import { nanoid } from 'nanoid';
const { Op } = require('sequelize');

class ADMIN {
  /**--------------------------TEST DATA ----------------------------*/
  getAllBookingList() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Booking.findAll({
          raw: false, //gộp lại k tách ra
          nest: true,
          include: [
            {
              model: db.User,
              as: 'userData',
              plain: true,
              include: [
                {
                  model: db.Customer,
                  as: 'info',
                  plain: true,
                },
              ],
            },
          ],
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new ADMIN();
