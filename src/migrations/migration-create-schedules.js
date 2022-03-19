'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Schedules',
      {
        scheduleID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        classID: {
          type: Sequelize.STRING,
        },
        subjectID: {
          type: Sequelize.STRING,
        },
        teacherID: {
          type: Sequelize.STRING,
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
    await queryInterface.dropTable('Schedules');
  },
};
