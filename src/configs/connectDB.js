const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('FJHok5nv9h', 'FJHok5nv9h', 'I1rOb9HYjM', {
  host: 'remotemysql.com',
  dialect: 'mysql',
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối đến DB thành công ');
  } catch (error) {
    console.error('Kết nối đến DB thất bại:', error);
  }
};

module.exports = connectDB;
