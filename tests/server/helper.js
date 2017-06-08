import faker from 'faker';


module.exports = {
  admin: {
    title: 'admin'
  },

  regular: {
    title: 'regular'
  },

  john: {
    firstName: faker.name.firstName().replace(/[.'"`]/g, ''),
    lastName: faker.name.lastName().replace(/[.'"`]/g, ''),
    userName: faker.random.word().replace(/[.'"`]/g, ''),
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: 21
  },

  doe: {
    firstName: faker.name.firstName().replace(/[.'"`]/g, ''),
    lastName: faker.name.lastName().replace(/[.'"`]/g, ''),
    userName: faker.random.word().replace(/[.'"`]/g, ''),
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: 2
  },

  segun: {
    firstName: faker.name.firstName().replace(/[.'"`]/g, ''),
    lastName: faker.name.lastName().replace(/[.'"`]/g, ''),
    userName: faker.random.word().replace(/[.'"`]/g, ''),
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: 3
  },

  superAdmin: {
    firstName: faker.name.firstName().replace(/[.'"`]/g, ''),
    lastName: faker.name.lastName().replace(/[.'"`]/g, ''),
    userName: faker.random.word().replace(/[.'"`]/g, ''),
    email: faker.internet.email(),
    password: faker.internet.password(),
    id: 1
  },

  testDocument1: {
    title: faker.company.catchPhrase(),
    content: faker.lorem.paragraph(),
  },

  testDocument2: {
    title: faker.finance.accountName(),
    content: faker.lorem.paragraph(),
    accessId: 2
  },

  testDocument3: {
    title: faker.commerce.department(),
    content: faker.lorem.paragraph()
  },

  // documentsCollection() {
  //   const documentParams = [];

  //   for (let i = 0; i <= 15; i += 1) {
  //     documentParams.push({
  //       title: faker.company.catchPhrase(),
  //       content: faker.lorem.paragraph(),
  //       ownerId: 1
  //     });
  //   }

  //   return documentParams;
  // }
};
