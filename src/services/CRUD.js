const db = require('../models/index');
import { nanoid } from 'nanoid';
const { Op } = require('sequelize');

class CRUD {
  getAllTestData() {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await db.Test.findAll({
          raw: true,
        });
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = new CRUD();
