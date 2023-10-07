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

    await queryInterface.bulkInsert('clans', 
      [
        {id:"1",ime:"Dusan",prezime:"Eric",broj_telefona:"0621235384",email:"deric@raf.rs"},
        {id:"2",ime:"Ognjen",prezime:"Radovic",broj_telefona:"0621235384",email:"oradovic@raf.rs"},
        {id:"3",ime:"Sara",prezime:"Petrovic",broj_telefona:"0621235384",email:"spetrovic@raf.rs"},
        {id:"4",ime:"Nastasja",prezime:"Buzadzic",broj_telefona:"0621235384",email:"nbuzadzic@raf.rs"},
        {id:"5",ime:"Jelena",prezime:"Drljan",broj_telefona:"0621235384",email:"jdrljan@raf.rs"},
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Clans', null, {});
  }
};