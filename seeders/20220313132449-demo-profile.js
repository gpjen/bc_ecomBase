'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('profiles', [{
        phone: '0811111111',
        gender: 'Pria',
        addres: 'bandung',
        idUser: '1',
      },
      // {
      //   phone: '082222222',
      //   gender: 'Wanita',
      //   addres: 'jakarta',
      //   idUser: 2,
      // },
      // {
      //   phone: '0833333333',
      //   gender: 'Wanita',
      //   addres: 'ambon',
      //   idUser: 3,
      // },
      // {
      //   phone: '084444444',
      //   gender: 'Wanita',
      //   addres: 'padang',
      //   idUser: 4,
      // },
      // {
      //   phone: '0855555555',
      //   gender: 'Wanita',
      //   addres: 'sorong',
      //   idUser: 5,
      // }
    ], {});
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('profiles', null, {});

  }
};