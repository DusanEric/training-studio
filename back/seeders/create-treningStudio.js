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

    await queryInterface.bulkInsert('treningStudios', 
      [
        {id:"1",naziv:"Sala:1",lokacijaID:1},
        {id:"2",naziv:"Sala:2",lokacijaID:2},
        {id:"3",naziv:"Sala:3",lokacijaID:3},
        {id:"4",naziv:"Sala:4",lokacijaID:2},
        {id:"5",naziv:"Sala:5",lokacijaID:1},
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('TreningStudios', null, {});
  }
};