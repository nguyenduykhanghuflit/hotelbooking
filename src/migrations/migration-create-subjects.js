'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Subjects',
      {
        subjectID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        subject: {
          type: Sequelize.STRING,
        },
        lesson: {
          type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Subjects');
  },
};
