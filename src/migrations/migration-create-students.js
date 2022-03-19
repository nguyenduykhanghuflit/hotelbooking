'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'Students',
      {
        studentID: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
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
        surName: {
          type: Sequelize.STRING,
        },
        middleName: {
          type: Sequelize.STRING,
        },
        name: {
          type: Sequelize.STRING,
        },
        dateOfBirth: {
          type: Sequelize.DATEONLY,
        },

        gender: {
          type: Sequelize.BOOLEAN,
        },
        domicile: {
          type: Sequelize.STRING,
        },
        address: {
          type: Sequelize.STRING,
        },
        fatherName: {
          type: Sequelize.STRING,
        },
        fatherYearBirth: {
          type: Sequelize.STRING,
        },
        fatherPhone: {
          type: Sequelize.STRING,
        },
        motherName: {
          type: Sequelize.STRING,
        },
        motherYearBirth: {
          type: Sequelize.STRING,
        },
        motherPhone: {
          type: Sequelize.STRING,
        },
        guardianName: {
          type: Sequelize.STRING,
        },
        guardianPhone: {
          type: Sequelize.STRING,
        },
        GN: {
          type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Students');
  },
};
