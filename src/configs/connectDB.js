const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('FJHok5nv9h', 'FJHok5nv9h', 'I1rOb9HYjM', {
  host: 'remotemysql.com',
  dialect: 'mysql',
  logging: false,
});

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Kết nối CSDL thành công ');
  } catch (error) {
    console.error('Kết nối CSDL thành công:', error);
  }
};

module.exports = connectDB;
