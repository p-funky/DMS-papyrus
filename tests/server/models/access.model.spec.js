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
