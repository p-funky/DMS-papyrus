module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('Access', [
      {
        title: 'public',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'private',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'role',
        createdAt: new Date(),
        updatedAt: new Date()
      }], { returning: true, validate: true });
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('Access',
      { title: ['public', 'private', 'role'] }, { returning: true });
  }
};
