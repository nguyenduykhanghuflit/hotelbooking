'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Classes',
      {
        classID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.STRING,
        },
        headTeacher: {
          type: Sequelize.STRING,
        },
        className: {
          type: Sequelize.STRING,
        },
        numberOfClass: {
          type: Sequelize.INTEGER,
        },
      },
      { define: { freezeTableName: true } }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Classes');
  },
};
