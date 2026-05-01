'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(
      async (transaction) => {
        await queryInterface.removeColumn('users', 'name', { transaction });
        await queryInterface.removeColumn('users', 'contact', { transaction });
        await queryInterface.removeColumn('users', 'email', { transaction });
        await queryInterface.removeColumn('users', 'password', { transaction });
      }
    )
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(
      async (transaction) => {
        await queryInterface.addColumn('users', 'name', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction });
        await queryInterface.addColumn('users', 'contact', {
          type: Sequelize.STRING,
          allowNull: true
        }, { transaction });
        await queryInterface.addColumn('users', 'email', {
          type: Sequelize.STRING,
        }, { transaction });
        await queryInterface.addColumn('users', 'password', {
          type: Sequelize.STRING,
          allowNull: false
        }, { transaction });
      }
    );
  }
};
