'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Addresses', [
      {
        street: '123 Main St',
        city: 'City',
        state: 'State',
        postalCode: '12345',
        country: 'Country',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: '456 Elm St',
        city: 'City',
        state: 'State',
        postalCode: '54321',
        country: 'Country',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        street: '456 PTS St',
        city: 'City',
        state: 'State',
        postalCode: '77321',
        country: 'Country',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Addresses', null, {});
  }
};
