'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(
    async (transaction) => {
      await queryInterface.createTable('auth', {
        id: {
          type: Sequelize.UUID,
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
        },
        userId: {
          type: Sequelize.UUID,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          unique: true
        },
        contact: {
          type: Sequelize.STRING,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        }
      }, { transaction });
    }
  ),

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(
      async (transaction) => {
        await queryInterface.dropTable('auth', { transaction });
      }
    );
  }
};
