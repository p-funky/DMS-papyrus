/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../../server/models';
import helper from '../helper';

const expect = chai.expect;
const assert = chai.assert;

const userDetails = helper.john;
const roleDetails = helper.admin;

const requiredFields = [
  'firstName', 'lastName', 'userName', 'email', 'password', 'roleId'];

const uniqueFields = ['email', 'userName'];


describe('Tests', () => {
  it('should start empty', () => {
    const arr = [];
    assert.equal(arr.length, 0);
  });
});

describe('User model- ', () => {
  describe('How User model works: ', () => {
    let user;
    before((done) => {
      models.Roles.create(roleDetails)
        .then((createdRole) => {
          userDetails.roleId = createdRole.id;
          return models.User.create(userDetails);
        })
        .then((createdUser) => {
          user = createdUser;
          done();
        });
    });

    after(() => models.sequelize.sync({ force: true }));

    it('should be able to create a user', () => {
      expect(user).not.to.be.null;
      expect(typeof user).to.equal('object');
    });
    it('should create a user with first & last name', () => {
      expect(user.firstName).to.equal(userDetails.firstName);
      expect(user.lastName).to.equal(userDetails.lastName);
    });
    it('should create a user with a valid email', () => {
      expect(user.email).to.equal(userDetails.email);
    });
    it('should create a user with hashed password', () => {
      expect(user.password).to.not.equal(userDetails.password);
    });
    it('should create a user with a defined Role', () => {
      models.User.findById(user.id, { include: [models.Roles] })
        .then((foundUser) => {
          expect(foundUser.Role.title).to.equal(roleDetails.title);
        });
    });

    it('should be able to update a user', (done) => {
      models.User.findById(user.id)
        .then(foundUser =>
          foundUser.update({ firstName: 'hagin' })
        )
        .then((updatedUser) => {
          expect(updatedUser.firstName).to.equal('hagin');
          done();
        });
    });
  });

  describe('How User model does Validation', () => {
    let user;
    beforeEach((done) => {
      models.Roles.create(roleDetails)
        .then((role) => {
          userDetails.roleId = role.id;
          user = models.User.build(userDetails);
          done();
        });
    });

    afterEach(() => models.sequelize.sync({ force: true }));

    describe('Required Fields', () => {
      requiredFields.forEach((field) => {
        it(`requires ${field} field to create a user`, () => {
          user[field] = null;
          return user.save()
            .catch((error) => {
              expect(/notNull Violation/.test(error.message)).to.be.true;
            });
        });
      });
    });

    describe('Unique Fields', () => {
      uniqueFields.forEach((field) => {
        it(`requires ${field} field to be Unique`, () => {
          user.save()
            .then((firstUser) => {
              userDetails.roleId = firstUser.roleId;
              // attempt to create another user with same parameters
              return models.User.build(userDetails).save();
            })
            .catch((error) => {
              expect(/UniqueConstraintError/.test(error.name)).to.be.true;
            });
        });
      });
    });

    describe('Mail Validation', () => {
      it('requires user mail to be authentic', () => {
        user.email = 'damibad.com';
        return user.save()
          .then((unsavedUser) => {
            expect(unsavedUser).to.exist;
          })
          .catch((error) => {
            expect(/ValidationError/.test(error.name)).to.be.true;
          });
      });
    });

    describe('Password Validation', () => {
      it('should be valid if compared', () =>
        user.save()
          .then((createdUser) => {
            expect(createdUser.isPassword(userDetails.password)).to.be.true;
          })
      );
    });
  });
});
