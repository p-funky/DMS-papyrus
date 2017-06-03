const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

const password = process.env.PASSWORD || 'password';

module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('User', [
      {
        firstName: 'Adeyinka',
        lastName: 'Alabi',
        userName: 'Pfunky',
        email: 'adeyinka.alabi@andela.com',
        password: bcrypt.hashSync(password),
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Naruto',
        lastName: 'Uzumaki',
        userName: 'Hokage',
        email: 'peephunky@gmail.com',
        password: bcrypt.hashSync(password),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Maito',
        lastName: 'Gai',
        userName: 'greenbeast',
        email: 'greenbeast@konoha.com',
        password: bcrypt.hashSync(password),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Rock',
        lastName: 'Lee',
        userName: 'fuzzybrows',
        email: 'fuzzybrows@konoha.com',
        password: bcrypt.hashSync(password),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Hatake',
        lastName: 'Kakashi',
        userName: 'copy-ninja',
        email: 'copy-ninja@konoha.com',
        password: bcrypt.hashSync(password),
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
      { returning: true, validate: true }
      );
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
  */
    return queryInterface.bulkDelete('User', null, {});
  }
};
