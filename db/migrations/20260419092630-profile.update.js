'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(
    async (transaction) => {
      await queryInterface.addColumn('profiles', 'name', {
        type: Sequelize.STRING,
      }, { transaction });
      await queryInterface.addColumn('profiles', 'contact', {
        type: Sequelize.STRING,
      }, { transaction });
      await queryInterface.addColumn('profiles', 'email', {
        type: Sequelize.STRING,
      }, { transaction });
    }
  ),

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(
      async (transaction) => {
        await queryInterface.removeColumn('profiles', 'name', { transaction });
        await queryInterface.removeColumn('profiles', 'contact', { transaction });
        await queryInterface.removeColumn('profiles', 'email', { transaction });
      }
    );
  }
};
