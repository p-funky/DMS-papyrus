/* eslint-disable no-unused-expressions */
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import helper from '../helper';
import models from '../../../server/models';


const request = supertest(app);
const expect = chai.expect;
const Roles = models.Roles;
const Documents = models.Documents;

const adminRoleParams = helper.admin;
const regularRoleParams = helper.regular;
const adminUserParams = helper.john;
const regularUserParams1 = helper.segun;
const regularUserParams2 = helper.doe;
const publicDocumentParams = helper.testDocument1;
const privateDocumentParams = helper.testDocument2;
const documentParams = helper.testDocument3;
const documentsCollection = helper.documentsCollection();

const compareDate = (dateA, dateB) =>
  new Date(dateA).getTime() < new Date(dateB).getTime();

describe('DOCUMENT ROUTES', () => {
  let adminRole, regularRole, adminUser, privateUser, privateUser2, publicToken,
    privateToken, publicRole, publicUser, privateToken2, publicDocument,
    privateDocument, roleDocument;

  before((done) => {
    Roles.bulkCreate([adminRoleParams, regularRoleParams], {
      returning: true })
      .then((createdRoles) => {
        adminRole = createdRoles[0];
        regularRole = createdRoles[1];
        adminUserParams.roleId = adminRole.id;
        // Two users here are assigned same roleId to demonstrate role access
        regularUserParams1.roleId = regularRole.id;
        regularUserParams2.roleId = regularRole.id;

        request.post('/users')
          .send(adminUserParams)
          .end((error, response) => {
            adminUser = response.body.newUser;
            
            publicToken = response.body.token;

            request.post('/users')
              .send(regularUserParams1)
              .end((err, res) => {
                privateUser = res.body.newUser;
                privateToken = res.body.token;

                request.post('/users')
                  .send(regularUserParams2)
                  .end((err, res) => {
                    privateUser2 = res.body.newUser;
                    privateToken2 = res.body.token;

                    documentParams.ownerId = adminUser.id;
                    publicDocumentParams.ownerId = adminUser.id;
                    Documents.create(publicDocumentParams)
                      .then((createdPublicDocument) => {
                        publicDocument = createdPublicDocument;
                        done();
                      });
                  });
              });
          });
      });
  });

  after(() => models.Documents.destroy({ where: {} }));
  // after(() => models.sequelize.sync({ force: true }));

  it('should correctly create test roles & user', () => {
    console.log('-------------------------------------', adminUser.email);
    expect(adminRole.title).to.equal(adminRoleParams.title);
    expect(regularRole.title).to.equal(regularRoleParams.title);
    expect(adminUser.email).to.equal(adminUserParams.email);
    expect(privateUser.email).to.equal(regularUserParams1.email);
    expect(adminUser.id).to.equal(21);
    expect(privateUser.id).to.equal(1);
  });
});

