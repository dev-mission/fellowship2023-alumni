'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Users',
          'roles',
          {
            type: Sequelize.DataTypes.JSONB,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'bio',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'userName',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'CohortId',
          {
            type: Sequelize.DataTypes.INTEGER,
            references: {
              model: {
                tableName: 'Cohorts',
              },
              key: 'id',
            },
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'linkedin',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
        queryInterface.addColumn(
          'Users',
          'currentPosition',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t },
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'roles', { transaction: t }),
        queryInterface.removeColumn('Users', 'bio', { transaction: t }),
        queryInterface.removeColumn('Users', 'userName', { transaction: t }),
        queryInterface.removeColumn('Users', 'CohortId', { transaction: t }),
        queryInterface.removeColumn('Users', 'linkedin', { transaction: t }),
        queryInterface.removeColumn('Users', 'currentPosition', { transaction: t }),
      ]);
    });
  },
};
