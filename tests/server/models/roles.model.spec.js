/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../../server/models';

const expect = chai.expect;
const roleDetails = { title: 'random' };

describe('Role Model', () => {
  describe('Create Role', () => {
    let role;
    before((done) => {
      models.Roles.create(roleDetails)
      .then((createdRole) => {
        role = createdRole;
        done();
      });
    });
    after((done) => {
      models.Roles.destroy({ where: { id: 3 } });
      done();
    });

    it('should be able to create new role', (done) => {
      expect(role).to.exist;
      expect(typeof role).to.equal('object');
      done();
    });

    it('should be able to create role with title', (done) => {
      expect(role.title).to.equal(roleDetails.title);
      done();
    });
    it('should return `validation error` if role name contains numbers`', (done) => {
      models.Roles.create({ title: '123random' })
        .catch((error) => {
          expect(error.errors[0].message).to.eql('roles can only contain letters');
          expect(error.errors[0].type).to.eql('Validation error');
          expect(error.name).to.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `unique constraint error` if role name already exists`', (done) => {
      models.Roles.create(roleDetails)
        .catch((error) => {
          expect(error.errors[0].message).to.eql('Role title must be unique');
          expect(error.errors[0].type).to.eql('unique violation');
          expect(error.name).to.eql('SequelizeUniqueConstraintError');
          done();
        });
    });
    it('should return `not null error` if role name is null`', (done) => {
      models.Roles.create({ title: null })
        .catch((error) => {
          expect(error.errors[0].message).to.eql('title cannot be null');
          expect(error.errors[0].type).to.eql('notNull Violation');
          expect(error.name).to.eql('SequelizeValidationError');
          done();
        });
    });
  });
});
