'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'HocSinhs',
      {
        studentID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        classID: {
          type: Sequelize.STRING,
        },
        scholasticID: {
          type: Sequelize.STRING,
        },
        oldSchool: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      { define: { freezeTableName: true } }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('HocSinhs');
  },
};
