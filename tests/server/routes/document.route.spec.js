// /* eslint-disable no-unused-expressions */
// import chai from 'chai';
// import supertest from 'supertest';
// import app from '../../../server';
// import helper from '../helper';
// import models from '../../../server/models';


// const request = supertest(app);
// const expect = chai.expect;
// const Roles = models.Roles;
// const Documents = models.Documents;
// const Access = models.Access;

// const adminRoleParams = helper.admin;
// const publicAccess = helper.public;
// const privateAccess = helper.private;
// const accessRole = helper.role;
// const regularRoleParams = helper.regular;
// const adminUserParams = helper.john;
// const regularUserParams1 = helper.segun;
// const regularUserParams2 = helper.doe;
// const publicDocumentParams = helper.testDocument1;
// const privateDocumentParams = helper.testDocument2;
// const documentParams = helper.testDocument3;
// const documentsCollection = helper.documentsCollection();

// const compareDate = (dateA, dateB) =>
//   new Date(dateA).getTime() < new Date(dateB).getTime();

// describe('DOCUMENT ROUTES', () => {
//   let adminRole, regularRole, adminUser, privateUser, privateUser2, publicToken,
//     privateToken, publicRole, publicUser, privateToken2, publicDocument,
//     privateDocument, roleDocument;

//   before((done) => {
//     Roles.bulkCreate([adminRoleParams, regularRoleParams], {
//       returning: true })
//       .then((createdRoles) => {
//         adminRole = createdRoles[0];
//         regularRole = createdRoles[1];
//         adminUserParams.roleId = adminRole.id;
//         // Two users here are assigned same roleId to demonstrate role access
//         regularUserParams1.roleId = regularRole.id;
//         regularUserParams2.roleId = regularRole.id;
//         request.post('/users')
//           .send(adminUserParams)
//           .end((error, response) => {
//             adminUser = response.body.newUser;
            
//             publicToken = response.body.token;

//             request.post('/users')
//               .send(regularUserParams1)
//               .end((err, res) => {
//                 privateUser = res.body.newUser;
//                 privateToken = res.body.token;

//                 request.post('/users')
//                   .send(regularUserParams2)
//                   .end((err, res) => {
//                     privateUser2 = res.body.newUser;
//                     privateToken2 = res.body.token;

//                     documentParams.ownerId = adminUser.id;
//                     publicDocumentParams.ownerId = adminUser.id;

//                     Access.bulkCreate(
//                       [publicAccess, privateAccess, accessRole], {
//                         returning: true })
//                         .then((createdAccess) => {
//                           documentParams.accessId = createdAccess[0].id;
//                           publicDocumentParams.accessId = createdAccess[0].id;
//                           Documents.create(publicDocumentParams)
//                             .then((createdPublicDocument) => {
//                               publicDocument = createdPublicDocument;
//                               done();
//                             });
//                         });
//                   });
//               });
//           });
//       });
//   });

//   after(() => models.Documents.destroy({ where: {} }));
//   after(() => models.Access.destroy({ where: {} }));
//   // after(() => models.Roles.destroy({ where: {} }));
//   // after(() => models.sequelize.sync({ force: true }));
//   after(() => setTimeout(() => console.log('please wait for 2 secs...'), 2000));

//   it('should correctly create test roles & users', () => {
//     expect(adminRole.title).to.equal(adminRoleParams.title);
//     expect(regularRole.title).to.equal(regularRoleParams.title);
//     expect(adminUser.email).to.equal(adminUserParams.email);
//     expect(privateUser.email).to.equal(regularUserParams1.email);
//     expect(adminUser.id).to.equal(21);
//     expect(privateUser.id).to.equal(3);
//   });

//   describe('REQUESTS', () => {
//     describe('POST: (/documents) - CREATE A DOCUMENT', () => {
//       it('should create a document for a validated user', (done) => {
//         request.post('/documents')
//           .set({ Authorization: publicToken })
//           .send(documentParams)
//           .end((error, response) => {
//             expect(response.status).to.equal(201);
//             expect(response.body.title).to.equal(documentParams.title);
//             expect(response.body.content)
//               .to.equal(documentParams.content);
//             done();
//           });
//       });
//       it('should not create a document without title',
//         (done) => {
//           const invalidDocument = { content: 'It has no content' };
//           request.post('/documents')
//             .set({ Authorization: publicToken })
//             .send(invalidDocument)
//             .expect(400, done);
//         });
//     });

//     describe('Requests for Documents', () => {
//       describe('GET: (/documents) - GET ALL DOCUMENTS', () => {
//         it('should not return documents if no token is provided', (done) => {
//           request.get('/documents')
//             .expect(401, done);
//         });
//         it('should not return documents if invalid token is provided',
//           (done) => {
//             request.get('/documents')
//               .set({ Authorization: 'ADRYDUIGUtrtrr6e' })
//               .expect(401, done);
//           });
//         it('should return all documents when valid token is provided',
//           (done) => {
//             request.get('/documents')
//               .set({ Authorization: publicToken })
//               .end((error, response) => {
//                 expect(response.status).to.equal(200);
//                 expect(Array.isArray(Object.keys(response.body))).to.be.true;
//                 expect(Object.keys(response.body).length).to.be.greaterThan(0);
//                 expect(response.body.documents[1].title)
//                   .to.equal(publicDocumentParams.title);
//                 done();
//               });
//           });
//       });
//     });
//   });
// });

