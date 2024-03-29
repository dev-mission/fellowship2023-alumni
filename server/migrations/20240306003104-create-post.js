'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
      postedOn: {
        type: Sequelize.DATE,
      },
      expiresOn: {
        type: Sequelize.DATE,
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      OrganizationId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Organizations',
          },
          key: 'id',
        },
      },
      applicationUrl: {
        type: Sequelize.STRING,
      },
      isPaidOpportunity: {
        type: Sequelize.BOOLEAN,
      },
      entryCost: {
        type: Sequelize.STRING,
      },
      referredBy: {
        type: Sequelize.STRING,
      },
      isRecurring: {
        type: Sequelize.BOOLEAN,
      },
      isArchived: {
        type: Sequelize.BOOLEAN,
      },
      workLocation: {
        type: Sequelize.STRING,
      },
      ProgramId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Programs',
          },
          key: 'id',
        },
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  },
};
