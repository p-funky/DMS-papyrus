/* eslint-disable no-unused-expressions */
import supertest from 'supertest';
import chai from 'chai';
import app from '../../../server';
import model from '../../../server/models';
import helper from '../helper';


const request = supertest(app);
const expect = chai.expect;

const john = helper.john;
const doe = helper.doe;
const segun = helper.segun;
const admin = helper.admin;
const regular = helper.regular;

describe('User ROUTES', () => {
  let user1;
  let user2;
  let user3;
  let token1;
  let token2;
  let token3;


  before(() => model.Roles.bulkCreate([admin, regular], {
    returning: true })
      .then((createdRoles) => {
        john.roleId = createdRoles[0].id;
        doe.roleId = createdRoles[1].id;
        segun.roleId = createdRoles[1].id;
      }));

  after(() => model.User.destroy({ where: {} }));
  after(() => model.sequelize.sync({ force: true }));


  describe('REQUESTS', () => {
    before((done) => {
      request.post('/users')
        .send(john)
        .end((error, response) => {
          user1 = response.body.newUser;
          token1 = response.body.token;

          request.post('/users')
            .send(doe)
            .end((err, res) => {
              user2 = res.body.newUser;
              token2 = res.body.token;

              request.post('/users')
                .send(segun)
                .end((err, res) => {
                  user3 = res.body.newUser;
                  token3 = res.body.token;
                  done();
                });
            });
        });
    });
    it('should not create another user with same user name', (done) => {
      request.post('/users')
        .send(john)
        .expect(409);
      done();
    });
    it('should get all users when provided valid token & access', (done) => {
      request.get('/users')
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(Array.isArray(Object.keys(response.body))).to.be.true;
          expect(response.body.users.length).to.be.greaterThan(0);
        });
      done();
    });

    describe('GET: (/users/:id) - GET A USER', () => {
      it('should not return a user id is invalid', (done) => {
        request.get('/users/345')
        .set({ Authorization: token1 })
        .expect(404);
        done();
      });
      it('should return the user with supplied id', (done) => {
        request.get(`/users/${user1.id}`)
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(user1.userName).to.equal(john.userName);
        });
        done();
      });
    });

    describe('PUT: (/users/:id) - UPDATE', () => {
      it('should not perform update if supplied id is invalid', (done) => {
        request.get('/users/333')
          .set({ Authorization: token1 })
          .expect(404);
        done();
      });
      it('should update a user if supplied id is valid', (done) => {
        const fieldsToUpdate = {
          firstName: 'Shegzy',
          lastName: 'Olobe'
        };
        request.put(`/users/${user1.id}`)
          .set({ Authorization: token1 })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.firstName).to.equal(fieldsToUpdate.firstName);
            done();
          });
      });
    });

    describe('DELETE: (/users/:id) - DELETE A USER', () => {
      it('should not perform a delete if supplied id is invalid', (done) => {
        request.get('/users/100')
          .set({ Authorization: token1 })
          .expect(404);
        done();
      });
      it('should succesfully delete a user when provided valid id', (done) => {
        request.delete(`/users/${user1.id}`)
          .set({ Authorization: token1 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            model.User.count()
              .then((userCount) => {
                expect(userCount).to.equal(2);
              });
            done();
          });
      });
      it('should perform delete on request from admin', (done) => {
        request.delete(`/users/${user2.id}`)
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
      });
    });

    describe('POST: (/users/login) - LOGIN', () => {
      it('should not login when supplied invalid username or password',
      (done) => {
        request.post('/users/login')
          .send({
            email: 'userName@mail.com',
            password: 'password'
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.token).to.not.exist;
            done();
          });
      });
      it('should login when supplied valid email & password', (done) => {
        request.post('/users/login')
          .send(segun)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.token).to.exist;
            expect(response.body.expiresIn).to.exist;
            done();
          });
      });
    });

    describe('POST: (/users/logout) - LOGOUT', () => {
      it('should logout a user', (done) => {
        request.post('/users/logout')
          .set({ Authorization: token3 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    });
  });
});
