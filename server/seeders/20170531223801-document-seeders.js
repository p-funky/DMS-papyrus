module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */

    return queryInterface.bulkInsert('Documents', [
      {
        title: 'Mary\'s Lamb',
        content: 'Mary had a little lamb',
        accessId: 1,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hot Cross Buns',
        content: 'One a penny, two a penny',
        accessId: 2,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Black Sheep',
        content: 'Baa baa black sheep, have you any wool?',
        accessId: 3,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Twinkle Twinkle Little Star',
        content: 'How I wonder what you are',
        accessId: 1,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Two Black Birds',
        content: 'One named Peter, one named Paul',
        accessId: 2,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Some Rivers in Africa',
        content: 'Nile, Niger, Senegal, Congo, Orange, Limpopo, Zambezi',
        accessId: 3,
        ownerId: 2,
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
    return queryInterface.bulkDelete('Documents', null, {});
  }
};
