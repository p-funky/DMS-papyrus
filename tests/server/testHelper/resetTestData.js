import logger from 'fm-log';
import models from '../../../server/models';

/**
 * ResetHelper class to reset/empty database
 */
class ResetTestData {

  /**
   * Resets the database models
   * @return {Void} - Returns Void
   */
  static init() {
    logger.notice('Resetting test database, please wait...');
    models.sequelize.sync({
      force: true
    })
    .then(() => {
      logger.info('Database was reset successfully.');
    });
  }
}

export default ResetTestData.init();
