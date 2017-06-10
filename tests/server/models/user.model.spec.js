/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../../server/models';

const expect = chai.expect;

const userDetails = {
  firstName: 'Skodo',
  lastName: 'Baggins',
  email: 'skodo.baggins@jjc.com',
  userName: 'skodo',
  password: '123456',
  roleId: 1
};

const requiredFields = [
  'firstName', 'lastName', 'userName', 'email', 'password', 'roleId'];

const uniqueFields = ['email', 'userName'];


describe('User model- ', () => {
  after((done) => {
    models.User.destroy({ where: { id: 6 } }).then(() => done());
  });
  describe('How User model works: ', () => {
    let user;
    before((done) => {
      models.User.create(userDetails)
        .then((createdUser) => {
          user = createdUser;
          done();
        });
    });

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
          expect(foundUser.Role.title).to.equal('admin');
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

  describe('How User model does Validation:', () => {
    let user;
    beforeEach((done) => {
      user = models.User.build(userDetails);
      done();
    });

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
          .catch((error) => {
            expect(/ValidationError/.test(error.name)).to.be.true;
          });
      });
    });

    describe('Password Validation', () => {
      let pass;
      before((done) => {
        userDetails.email = 'alaba@alaba.com';
        userDetails.userName = 'anumidun';
        models.User.create(userDetails)
          .then((createdUser) => {
            pass = createdUser;
            done();
          });
      });
      after((done) => {
        models.User.destroy({ where: { id: 9 } }).then(() => done());
      });
      it('should be valid if compared', () => {
        expect(pass.isPassword(userDetails.password)).to.be.true;
      });
    });
  });
});
