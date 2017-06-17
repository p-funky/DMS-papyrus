import chai from 'chai';
import db from '../../../server/models/index';


const expect = chai.expect;

describe('Access Model', () => {
  describe('Create Access', () => {
    it('should create a new access level', (done) => {
      db.Access.create({ title: 'moderator' })
        .then((access) => {
          expect(access.title).to.eql('moderator');
          done();
        });
    });
  });

  describe('Read Access', () => {
    it('should retrieve access level', (done) => {
      db.Access.findById(1)
        .then((access) => {
          expect(access.title).to.eql('public');
        });
      done();
    });
  });

  describe('Update Access', () => {
    it('should update a created access', (done) => {
      db.Access.findById(4)
        .then((access) => {
          const updatedAt = access.updatedAt;
          access.update({ title: 'facilitator' })
            .then((updatedAccess) => {
              expect(updatedAccess.title).to.eql('facilitator');
              expect(updatedAccess.updatedAt).to.not.eql(updatedAt);
            });
          done();
        });
    });
  });

  describe('validations', () => {
    it('should return `unique constraint error` if access name already exists`', (done) => {
      db.Access.create({ title: 'facilitator' })
        .catch((error) => {
          expect(error.errors[0].message).to.eql('Access title must be unique');
          expect(error.errors[0].type).to.eql('unique violation');
          expect(error.name).to.eql('SequelizeUniqueConstraintError');
          done();
        });
    });
    it('should return `validation error` if access name contains numbers`', (done) => {
      db.Access.create({ title: '123random' })
        .catch((error) => {
          expect(error.errors[0].message).to.eql('access can only contain letters');
          expect(error.errors[0].type).to.eql('Validation error');
          expect(error.name).to.eql('SequelizeValidationError');
          done();
        });
    });
    it('should return `not null error` if access name is null`', (done) => {
      db.Access.create({ title: null })
        .catch((error) => {
          expect(error.errors[0].message).to.eql('title cannot be null');
          expect(error.errors[0].type).to.eql('notNull Violation');
          expect(error.name).to.eql('SequelizeValidationError');
          done();
        });
    });
  });

  describe('Delete Access', () => {
    it('should delete a created access', (done) => {
      db.Access.destroy({ where: { id: 4 } })
        .then(() => {
          db.Access.findById(4)
            .then((destroyedAccess) => {
              expect(destroyedAccess).to.be.a('null');
            });
          done();
        });
    });
  });
});
