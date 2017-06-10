import bcrypt from 'bcrypt';
import logger from 'fm-log';

import models from '../../../server/models/';
import testData from './testData';

const superAdmin = testData.superAdmin;
const john = testData.john;
const doe = testData.doe;
const segun = testData.segun;
const tunji = testData.tunji;


/**
 * SeedData class to populate database with default data
 */
class SeedTestData {

  /**
   * Perform the sequential population of the model
   * in order of associations
   * @return {Void} - Returns Void
   */
  static init() {
    logger.notice('Populating test database, please wait...');
    models.sequelize.sync({
      force: true
    })
      .then(() => {
        SeedTestData.populateRoleTable()
          .then(() => {
            SeedTestData.populateUserTable()
              .then(() => {
                SeedTestData.populateAccessTable()
                  .then(() => {
                    SeedTestData.populateDocumentTable()
                      .catch((err) => {
                        logger.error('=============DOCUMENT TABLE', err);
                      });
                  })
                  .catch((err) => {
                    logger.error('=============ACCESS TABLE', err);
                  });
              })
              .catch((err) => {
                logger.error('=============USER TABLE', err);
              });
          })
          .catch((err) => {
            logger.error('=============ROLES TABLE', err);
          });
      })
      .catch((err) => {
        logger.error('=============SYNC', err);
      });
  }

  /**
   * Populates model with default roles
   * @returns {object} - A Promise object
   */
  static populateRoleTable() {
    const roles =
      [testData.admin, testData.regular];
    return models.Roles.bulkCreate(roles);
  }

  /**
   * Populates model with default access
   * @returns {object} - A Promise object
   */
  static populateAccessTable() {
    const access =
      [testData.public, testData.private, testData.role];
    return models.Access.bulkCreate(access);
  }

  /**
   * Define bycrypt to hash password
   * @param {String} password - User password
   * @returns {String} - Hashed password
   */
  static hashPass(password) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  /**
   * Populates model with default users
   * @returns {object} - A Promise object
   */
  static populateUserTable() {
    superAdmin.password = SeedTestData.hashPass(superAdmin.password);
    john.password = SeedTestData.hashPass(john.password);
    doe.password = SeedTestData.hashPass(doe.password);
    segun.password = SeedTestData.hashPass(segun.password);
    tunji.password = SeedTestData.hashPass(tunji.password);

    const users =
      [superAdmin, doe, segun, tunji, john];
    return models.User.bulkCreate(users);
  }

  /**
   * Populates model with default documents
   * @returns {object} - A Promise object
   */
  static populateDocumentTable() {
    const documents = [
      testData.testDocument1,
      testData.testDocument2,
      testData.testDocument3
    ];
    const documentsCollection = testData.documentsCollection();
    const allDocuments = documents.concat(documentsCollection);
    return models.Documents.bulkCreate(allDocuments);
  }
}

export default SeedTestData.init();
