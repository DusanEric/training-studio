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

    await queryInterface.bulkInsert('cenovniks', 
      [
        {id:"1",cena:"2500",treningID:1},
        {id:"2",cena:"3500",treningID:2},
        {id:"3",cena:"2000",treningID:3},
        {id:"4",cena:"4000",treningID:4},
        {id:"5",cena:"1500",treningID:5},
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Cenovniks', null, {});
  }
};