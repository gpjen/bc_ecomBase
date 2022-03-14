'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
        name: 'seller01',
        email: 'seller01@gmail.com',
        password: 'seller01',
        status: 'seller'
      },
      {
        name: 'seller02',
        email: 'seller02@gmail.co.id',
        password: 'seller02',
        status: 'seller'
      },
      {
        name: 'buyer tampan',
        email: 'buyer.tampan@gmail.com',
        password: 'buyertampan',
        status: 'buyer'
      },
      {
        name: 'buyer cantik',
        email: 'buyer.cantik@gmail.com',
        password: 'buyercantik',
        status: 'buyer'
      },
      {
        name: 'buyer cerewet',
        email: 'buyer.cerewet@gmail.com',
        password: 'buyer.cerewet',
        status: 'buyer'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});
  }
};