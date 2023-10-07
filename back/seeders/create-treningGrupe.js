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

    await queryInterface.bulkInsert('treningGrupas', 
      [
        {id:"1",grupa:"1",treningID:4,trenerID:2,treningStudioID:1},
        {id:"2",grupa:"2",treningID:2,trenerID:1,treningStudioID:2},
        {id:"3",grupa:"3",treningID:1,trenerID:2,treningStudioID:3},
        {id:"4",grupa:"4",treningID:5,trenerID:5,treningStudioID:1},
        {id:"5",grupa:"5",treningID:2,trenerID:3,treningStudioID:2},
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TreningGrupas', null, {});
  }
};