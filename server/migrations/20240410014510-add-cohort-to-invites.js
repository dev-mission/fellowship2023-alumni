/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Invites', 'CohortId', {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'Cohorts',
        },
        key: 'id',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Invites', 'CohortId');
  },
};
