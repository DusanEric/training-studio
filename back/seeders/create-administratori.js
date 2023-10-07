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

    await queryInterface.bulkInsert('administrators', 
      [
        {id:"1",username:"admin1",pass:"admin1"},
        {id:"2",username:"admin2",pass:"admin2"},
        {id:"3",username:"admin3",pass:"admin3"},
        {id:"4",username:"admin4",pass:"admin4"},
        {id:"5",username:"admin5",pass:"admin5"},
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Administrators', null, {});
  }
};