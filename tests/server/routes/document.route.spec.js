/* eslint-disable no-unused-expressions */
import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import helper from '../testHelper/testData';
import models from '../../../server/models';


const request = supertest(app);
const expect = chai.expect;

const adminUserParams = helper.john;
const regularUserParams1 = helper.segun;
const regularUserParams2 = helper.doe;
const regularUserParams3 = helper.kunle;
const publicDocumentParams = helper.testDocument1;
const privateDocumentParams = helper.testDocument2;
const documentParams = helper.testDocument3;
publicDocumentParams.title = 'One';
privateDocumentParams.title = 'Two';
documentParams.title = 'Three';

const unusedDocs = helper.documentsCollection();

describe('DOCUMENT ROUTES', () => {
  let adminUser, privateUser2, johnToken,
    segunToken, doeToken, kunleToken, publicDocument,
    privateDocument, roleDocument, roleDocument2;

  before((done) => {
    request.post('/users/login')
      .send(adminUserParams)
      .end((error, response) => {
        adminUser = response.body.existingUser;
        johnToken = response.body.token;

        request.post('/users/login')
          .send(regularUserParams1)
          .end((err, res) => {
            segunToken = res.body.token;

            request.post('/users/login')
              .send(regularUserParams2)
              .end((err, res) => {
                privateUser2 = res.body.existingUser;
                doeToken = res.body.token;

                documentParams.ownerId = adminUser.id;
                publicDocumentParams.ownerId = adminUser.id;

                models.Documents.create(publicDocumentParams)
                  .then((createdPublicDocument) => {
                    publicDocument = createdPublicDocument;

                    request.post('/users/')
                      .send(regularUserParams3)
                      .end((err, res) => {
                        kunleToken = res.body.token;
                        done();
                      });
                  });
              });
          });
      });
  });

  describe('REQUESTS', () => {
    describe('POST: (/documents) - CREATE A DOCUMENT', () => {
      it('should create a document for a validated user', (done) => {
        request.post('/documents')
          .set({ Authorization: johnToken })
          .send(documentParams)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body.title).to.equal(documentParams.title);
            expect(response.body.content)
              .to.equal(documentParams.content);
            done();
          });
      });
      it('should not create a document without title', (done) => {
        const invalidDocument = { content: 'It has no title' };
        request.post('/documents')
          .set({ Authorization: johnToken })
          .send(invalidDocument)
          .expect(400, done);
      });
      it('should not create a document with existing title', (done) => {
        const invalidDocument = { title: documentParams.title };
        request.post('/documents')
          .set({ Authorization: johnToken })
          .send(invalidDocument)
          .end((error) => {
            expect(400, error);
            done();
          });
      });
    });

    describe('Requests for Documents', () => {
      describe('GET: (/documents) - GET ALL DOCUMENTS', () => {
        it('should not return documents if no token is provided', (done) => {
          request.get('/documents')
            .expect(401, done);
        });
        it('should not return documents if invalid token is provided',
          (done) => {
            request.get('/documents')
              .set({ Authorization: 'ADRYDUIGUtrtrr6e' })
              .expect(401, done);
          });
        it('should return all documents when valid admin token is provided',
          (done) => {
            request.get('/documents')
              .set({ Authorization: johnToken })
              .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(Array.isArray(Object.keys(response.body))).to.be.true;
                expect(Object.keys(response.body).length).to.be.greaterThan(0);
                expect(response.body.documents[1].title)
                  .to.equal(publicDocumentParams.title);
                done();
              });
          });
        it('should return some documents when regular token is provided',
          (done) => {
            request.get('/documents')
              .set({ Authorization: segunToken })
              .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(Array.isArray(Object.keys(response.body))).to.be.true;
                expect(Object.keys(response.body).length).to.be.greaterThan(0);
                expect(response.body.documents[1].title)
                  .to.equal(publicDocumentParams.title);
                done();
              });
          });
      });
    });

    describe('GET: (/documents/:id) - GET A DOCUMENT', () => {
      it('should not return a document if invalid id is provided',
        (done) => {
          request.get('/documents/789')
            .set({ Authorization: johnToken })
            .expect(404, done);
        });
      it('should return the document when requester is admin',
        (done) => {
          request.get(`/documents/${publicDocument.id}`)
            .set({ Authorization: johnToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.title).to.equal(publicDocument.title);
              expect(response.body.content).to.equal(publicDocument.content);
              done();
            });
        });
      it('should return the document when public',
        (done) => {
          request.get(`/documents/${publicDocument.id}`)
            .set({ Authorization: segunToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.title).to.equal(publicDocument.title);
              expect(response.body.content).to.equal(publicDocument.content);
              done();
            });
        });
    });

    describe('PUT: (/documents/:id) - EDIT A DOCUMENT', () => {
      it('should not perform edit if invalid doc id is provided', (done) => {
        const fieldToUpdate = { content: 'replace previous document' };
        request.put('/documents/789')
          .set({ Authorization: johnToken })
          .send(fieldToUpdate)
          .expect(404, done);
      });
      it('should not perform edit if User is not document Owner',
      (done) => {
        const fieldToUpdate = { content: 'replace previous document' };
        request.put(`/documents/${publicDocument.id}`)
          .set({ Authorization: segunToken })
          .send(fieldToUpdate)
          .expect(401, done);
      });
      it('should correctly edit document if valid id is provided',
        (done) => {
          const fieldToUpdate = {
            title: 'Alakuko', content: 'replace previous document'
          };
          request.put(`/documents/${publicDocument.id}`)
            .set({ Authorization: johnToken })
            .send(fieldToUpdate)
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.content).to.equal(fieldToUpdate.content);
              done();
            });
        });
      it('should correctly edit document if new title is provided',
        (done) => {
          const fieldToUpdate = {
            title: 'Replaced New Title', content: 'replace previous document'
          };
          request.put(`/documents/${publicDocument.id}`)
            .set({ Authorization: johnToken })
            .send(fieldToUpdate)
            .end((error, response) => {
              expect(response.status).to.equal(200);
              expect(response.body.content).to.equal(fieldToUpdate.content);
              done();
            });
        });
      it('should not update document title if new title is already existing',
        (done) => {
          const fieldToUpdate = {
            title: 'Ojos de cielo', content: 'This should fail'
          };
          request.put(`/documents/${publicDocument.id}`)
            .set({ Authorization: johnToken })
            .send(fieldToUpdate)
            .end((error, response) => {
              expect(response.status).to.equal(400);
              done();
            });
        });
    });

    describe('GET: (/users/:id/documents) - GET A USER\'S DOCUMENTS', () => {
      it('should not return a document if invalid document id is provided',
        (done) => {
          request.get('/users/783/documents')
            .set({ Authorization: johnToken })
            .expect(404, done);
        });
      it('should return the documents when requester is admin',
        (done) => {
          request.get('/users/2/documents')
            .set({ Authorization: johnToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              done();
            });
        });
      it('should return the documents when requester is owner',
        (done) => {
          request.get('/users/2/documents')
            .set({ Authorization: doeToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              done();
            });
        });
      it('should NOT return any documents when requester is NOT admin or owner',
        (done) => {
          request.get('/users/2/documents')
            .set({ Authorization: segunToken })
            .end((error, response) => {
              expect(response.status).to.equal(401);
              done();
            });
        });
      it('should NOT find any documents when user has no documents',
        (done) => {
          request.get('/users/10/documents')
            .set({ Authorization: kunleToken })
            .end((error, response) => {
              expect(response.status).to.equal(404);
              done();
            });
        });
    });

    describe('DELETE: (/documents/:id) - DELETE A DOCUMENT', () => {
      it('should not perform delete if an invalid id is provided',
        (done) => {
          request.delete('/documents/789')
            .set({ Authorization: johnToken })
            .expect(404, done);
        });
      it('should not perform delete if User is not document Owner',
        (done) => {
          const fieldToUpdate = { content: 'replace previous document' };
          request.delete(`/documents/${publicDocument.id}`)
            .set({ Authorization: segunToken })
            .send(fieldToUpdate)
            .expect(403, done);
        });
      it('should succesfully delete when provided a valid Id', (done) => {
        request.delete(`/documents/${publicDocument.id}`)
          .set({ Authorization: johnToken })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message)
            .to.equal('Document successfully deleted');
            done();
          });
      });
    });

    describe('Requests for Documents with Access set to Private', () => {
      describe('GET: (/documents/:id - GET A DOCUMENT)', () => {
        before((done) => {
          privateDocumentParams.title = 'When I wake up';
          privateDocumentParams.content = 'When I wake up';
          models.Documents.create(privateDocumentParams)
            .then((createdDocument) => {
              privateDocument = createdDocument;
              done();
            });
        });
        it('should NOT return document when user is not the owner',
        (done) => {
          request.get(`/documents/${privateDocument.id}`)
            .set({ Authorization: segunToken })
            .expect(403, done);
        });
        it('should NOT return document even when user has same role as owner',
          (done) => {
            request.get(`/documents/${privateDocument.id}`)
              .set({ Authorization: segunToken })
              .expect(403, done);
          });
        it('should ONLY return the document when the user is the owner or admin',
          (done) => {
            request.get(`/documents/${privateDocument.id}`)
              .set({ Authorization: doeToken })
              .end((error, response) => {
                expect(response.status).to.equal(200);
                expect(response.body.title)
                  .to.equal(privateDocumentParams.title);
                expect(response.body.content)
                  .to.equal(privateDocumentParams.content);
                done();
              });
          });
      });
    });

    describe('Requests for Documents with Access set to Role', () => {
      describe('GET: (/documents/:id - GET A DOCUMENT)', () => {
        before((done) => {
          documentParams.title = 'Song in my soul';
          documentParams.content = 'And you made me';
          documentParams.ownerId = privateUser2.id;
          documentParams.accessId = 3;

          models.Documents.create(documentParams)
            .then((createdDocument1) => {
              roleDocument = createdDocument1;
              console.log('=====================>>>>>>>>>>>>>>>', roleDocument);

              const adminDocument = helper.testDocument4;
              models.Documents.create(adminDocument)
                .then((createdDocument2) => {
                  roleDocument2 = createdDocument2;
                  done();
                });
            });
        });

        it('should return document when user has same role as owner', (done) => {
          request.get(`/documents/${roleDocument.id}`)
            .set({ Authorization: segunToken })
            .end((errors, response) => {
              console.log('=====================>>>>>>>>>>>>>>>', response.body);
              expect(response.status).to.equal(200);
              expect(response.body.title).to.equal(documentParams.title);
              expect(response.body.content).to.equal(documentParams.content);
              done();
            });
        });

        it('should NOT return when user has different role as owner', (done) => {
          request.get(`/documents/${roleDocument2.id}`)
            .set({ Authorization: doeToken })
            .end((errors, response) => {
              expect(response.status).to.equal(403);
              done();
            });
        });
      });
    });

    describe('Document Search', () => {
      it('allows use of query params "search" to get documents by search query',
        (done) => {
          request.get('/search/documents?search=weird')
            .set({ Authorization: johnToken })
            .end((error, response) => {
              expect(response.status).to.equal(200);
              const query = {
                where: { id: response.body.documents[0].id },
                include: [{
                  model: models.User,
                  as: 'User'
                }]
              };
              models.Documents.findAll(query)
                .then((foundDocuments) => {
                  expect(foundDocuments[0].User.roleId).to.equal(1);
                  done();
                });
            });
        });
      it('returns documents with a default limit if the limit is not valid',
        (done) => {
          request.get(`/search/documents?search=the?limit=${-1}`)
            .set({ Authorization: johnToken })
            .expect(200, done);
        });
      it('returns documents with a default offset if the offset is not valid',
        (done) => {
          request.get(`/search/documents?search=and?offset=${-2}`)
            .set({ Authorization: segunToken })
            .expect(200, done);
        });
    });
  });
});

