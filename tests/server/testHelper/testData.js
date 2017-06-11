import faker from 'faker';

const helper = {
  admin: {
    title: 'admin'
  },

  regular: {
    title: 'regular'
  },

  public: {
    title: 'public'
  },

  private: {
    title: 'private'
  },

  role: {
    title: 'role'
  },

  superAdmin: {
    firstName: 'Pfunky',
    lastName: 'Kakashi',
    email: 'pfunky.kakashi@dms.com',
    userName: 'pfunky',
    password: '123456',
    roleId: 1
  },

  john: {
    firstName: 'John',
    lastName: 'Bosco',
    email: 'john.bosco@jjc.com',
    userName: 'john',
    password: '123456',
    roleId: 1
  },

  doe: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@jjc.com',
    userName: 'doe',
    password: '123456',
    roleId: 2
  },

  segun: {
    firstName: 'Segun',
    lastName: 'Dare',
    email: 'segun.dare@jjc.com',
    userName: 'segun',
    password: '123456',
    roleId: 2
  },

  tunji: {
    firstName: 'Tunji',
    lastName: 'Alao',
    email: 'tunji.alao@jjc.com',
    userName: 'tunji',
    password: '123456',
    roleId: 2
  },

  kunle: {
    firstName: 'Kunle',
    lastName: 'Adigun',
    email: 'kunle.adigun@jjc.com',
    userName: 'kunle',
    password: '123456',
    roleId: 2
  },

  testDocument1: {
    title: 'Ojos de cielo',
    content: 'Si yo me oluidara de lo verdadero',
    ownerId: 5,
    accessId: 1
  },

  testDocument2: {
    title: 'Un ciodo',
    content: 'Un ciodo de ferrovecio de la mechanica de la mechanica',
    ownerId: 2,
    accessId: 2
  },

  testDocument3: {
    title: 'Tinotenda Yesu',
    content: 'Tinotenda Jesu, Tinotenda Shumba Yedenga',
    ownerId: 3,
    accessId: 1
  },

  testDocument4: {
    title: 'A weird name',
    content: 'WOWU',
    ownerId: 5,
    accessId: 3
  },

  documentsCollection() {
    const documentParams = [];

    for (let i = 0; i <= 15; i += 1) {
      documentParams.push({
        title: faker.company.catchPhrase(),
        content: faker.lorem.paragraph(),
        ownerId: 1
      });
    }

    return documentParams;
  }

};

export default helper;
