/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../../server/models';

const expect = chai.expect;


describe('Created models', () => {
  it('should have User model created', () => {
    expect(models.User).to.exist;
  });
  it('should have Roles model created', () => {
    expect(models.Roles).to.exist;
  });
  it('should have Documents model created', () => {
    expect(models.Documents).to.exist;
  });
  it('should have Access model created', () => {
    expect(models.Access).to.exist;
  });
});
