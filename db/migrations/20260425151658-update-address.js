'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(
    async (transaction) => {
      await queryInterface.addColumn('addresses', 'default', {
        type: Sequelize.STRING,
      }, { transaction });
    }
  ),

  async down(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(
      async (transaction) => {
        await queryInterface.removeColumn('addresses', 'default', { transaction });
      }
    );
  }
};
