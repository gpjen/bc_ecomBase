'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('category', [{
        name: 'Baju Dewasa'
      },
      {
        name: 'Celana Dewasa'
      },
      {
        name: 'Dalaman Dewasa'
      },
      {
        name: 'Baju anak'
      },
      {
        name: 'Celana anak'
      },
      {
        name: 'Dalaman anak'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('category', null, {});

  }
};