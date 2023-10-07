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

    await queryInterface.bulkInsert('treners', 
      [
        {id:"1",ime:"Milos",prezime:"Milosevic",broj_telefona:"0621235384",email:"deric@raf.rs"},
        {id:"2",ime:"Nikola",prezime:"Nikolic",broj_telefona:"0621235384",email:"oradovic@raf.rs"},
        {id:"3",ime:"Petar",prezime:"Petrovic",broj_telefona:"0621235384",email:"spetrovic@raf.rs"},
        {id:"4",ime:"Mitar",prezime:"Mitrovic",broj_telefona:"0621235384",email:"nbuzadzic@raf.rs"},
        {id:"5",ime:"Jovana",prezime:"Jovanovic",broj_telefona:"0621235384",email:"jdrljan@raf.rs"},
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Treners', null, {});
  }
};