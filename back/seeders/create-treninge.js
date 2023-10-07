'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('trenings', 
      [
        {id:"1",tip:"grupni"},
        {id:"2",tip:"individualni"},
        {id:"3",tip:"cross-fit"},
        {id:"4",tip:"takmicarski"},
        {id:"5",tip:"penzionerski"},
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Trenings', null, {});
  }
};