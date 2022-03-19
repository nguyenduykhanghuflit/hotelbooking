'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Scores',
      {
        scoreID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        subjectID: {
          type: Sequelize.STRING,
        },
        studentID: {
          type: Sequelize.STRING,
        },
        score15m11: {
          type: Sequelize.DOUBLE,
        },
        score15m12: {
          type: Sequelize.DOUBLE,
        },
        score45m11: {
          type: Sequelize.DOUBLE,
        },
        score45m12: {
          type: Sequelize.DOUBLE,
        },
        testScore1: {
          type: Sequelize.DOUBLE,
        },
        GPA1: {
          type: Sequelize.DOUBLE,
        },
        score15m21: {
          type: Sequelize.DOUBLE,
        },
        score15m22: {
          type: Sequelize.DOUBLE,
        },
        score45m21: {
          type: Sequelize.DOUBLE,
        },
        score45m22: {
          type: Sequelize.DOUBLE,
        },
        testScore2: {
          type: Sequelize.DOUBLE,
        },
        GPA2: {
          type: Sequelize.DOUBLE,
        },
        GPA: {
          type: Sequelize.DOUBLE,
        },
        createdAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: true,
          type: Sequelize.DATE,
        },
      },
      { define: { freezeTableName: true } }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Scores');
  },
};
