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

    await queryInterface.bulkInsert('placanjes', 
      [
        {id:"1",iznos:"2500",racun:"4763392-4378",clanID:1,cenovnikID:1,status: false},
        {id:"2",iznos:"3500",racun:"4763392-4378",clanID:2,cenovnikID:2,status: false},
        {id:"3",iznos:"2000",racun:"4763392-4378",clanID:3,cenovnikID:3,status: false},
        {id:"4",iznos:"4000",racun:"4763392-4378",clanID:3,cenovnikID:4,status: false},
        {id:"5",iznos:"1500",racun:"4763392-4378",clanID:5,cenovnikID:5,status: false},
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Placanjes', null, {});
  }
};