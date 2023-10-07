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

    await queryInterface.bulkInsert('prijavaGrupes', 
      [
        {id:"1",clanID:1,treningGrupaID:1,status: false},
        {id:"2",clanID:2,treningGrupaID:2,status: false},
        {id:"3",clanID:3,treningGrupaID:3,status: true},
        {id:"4",clanID:2,treningGrupaID:4,status: false},
        {id:"5",clanID:5,treningGrupaID:5,status: true},
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PrijavaGrupes', null, {});
  }
};