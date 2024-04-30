'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cohorts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cohortNumber: {
        type: Sequelize.INTEGER,
      },
      graduatedOn: {
        type: Sequelize.DATE,
      },
      year: {
        type: Sequelize.STRING,
      },
      term: {
        type: Sequelize.STRING,
      },
      affiliation: {
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
    });
    await queryInterface.addIndex('Cohorts', {
      fields: ['cohortNumber'],
      unique: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cohorts');
  },
};
