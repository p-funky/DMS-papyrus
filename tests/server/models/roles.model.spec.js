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

    it('should be able to create role', (done) => {
      expect(role).to.exist;
      expect(typeof role).to.equal('object');
      done();
    });

    it('should be able to create role with title', (done) => {
      expect(role.title).to.equal(roleDetails.title);
      done();
    });
  });
});
