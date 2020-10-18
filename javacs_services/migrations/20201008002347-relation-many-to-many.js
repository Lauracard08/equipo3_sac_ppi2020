'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('users', {
      type: 'FOREIGN KEY',
      name: 'FK_Users_Student',
      fields: ['userId'],
      references: {
        table: 'students',
        field: 'id'
      },
      onDelete: 'no action',
      onUpdate: 'no action'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint('users', 'FK_Users_Student')
  }
};
