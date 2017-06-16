import models from '../../models';
import paginate from '../pagination';

const User = models.User;
const Documents = models.Documents;

/**
 * This classs contains helpers methids for the document controller
 *
 * @class UserControllerHelper
 */
class UserControllerHelper {
  /**
   * This method checks if there are users to be shown
   * in the user list controller
   *
   * @static
   * @param {object} user
   * @param {res} res the response object
   * @param {limit} limit
   * @param {offset} offset
   * @returns {object} user and/or message
   *
   * @memberof UserControllerHelper
   */
  static listUsers(user, res, limit, offset) {
    const rows = user.rows;
    const count = user.count;
    const settings = paginate(rows, count, limit, offset);
    return res.status(200).send({
      users: rows, settings
    });
  }

  /**
   * The method extracts users from the database
   *
   * @static
   * @param {object} req
   * @param {object} res
   * @returns {object} users
   *
   * @memberof UserControllerHelper
   */
  static extractUsers(req, res) {
    const limit = req.query.limit > 0 ? req.query.limit : '8';
    const offset = req.query.offset > 0 ? req.query.offset : '0';
    const where = req.where ? req.where : {};
    User.findAndCountAll({
      attributes: ['id', 'firstName', 'lastName',
        'email', 'userName', 'roleId'],
      where,
      limit,
      offset,
      order: '"createdAt" ASC'
    })
    .then((user) => {
      const result = UserControllerHelper
        .listUsers(user, res, limit, offset);
      return result;
    });
  }

  /**
   * The method validates if a user can be deleted from the database
   *
   * @static
   * @param {object} existingUser
   * @param {String} id
   * @param {object} req
   * @param {object} res
   * @returns {object} message
   *
   * @memberof UserControllerHelper
   */
  static canDelete(existingUser, id, req, res) {
    if (!existingUser) {
      return res.status(404)
        .send({
          message: 'User not found'
        });
    }
    if (existingUser.id === 1) {
      return res.status(403)
        .send({
          message: 'Hmmm... the OGA at the top! DON\'T TRY IT!!!'
        });
    }

    if (existingUser.roleId === 1 && req.decoded.roleId !== 1) {
      return res.status(401)
        .send({
          message: 'Cannot delete admin.'
        });
    }

    if (Number(id) !== req.decoded.userId && req.decoded.roleId !== 1) {
      return res.status(401)
        .send({
          message: 'You cannot delete this user'
        });
    }
    Documents.findAndCountAll({
      include: [{
        model: User,
        attributes: [
          'userName'
        ]
      }],
      where: { ownerId: id } })
    .then((existingDocuments) => {
      if (existingDocuments.count) {
        return res.status(409)
          .send({
            message: 'Cannot delete user while user still has documents'
          });
      }
      return existingUser.destroy()
        .then(() => res.status(200)
          .send({
            User: existingUser,
            Message: 'User succesfully deleted'
          })
        );
    });
  }

  /**
   * The method validates if a user can be updated
   *
   * @static
   * @param {object} existingUser
   * @param {String} id
   * @param {object} req
   * @param {object} res
   * @returns {object} message
   *
   * @memberof UserControllerHelper
   */
  static canUpdate(existingUser, id, req, res) {
    if (Number(id) !== req.decoded.userId) {
      if (req.decoded.roleId === 1 && existingUser.id === 1) {
        return res.status(401)
          .send({
            message: 'You cannot edit this admin!!!'
          });
      }
      if (req.decoded.roleId === 1 && (req.body.email || req.body.firstName
          || req.body.lastName || req.body.userName || req.body.password)) {
        return res.status(401)
          .send({
            message: 'You can only promote/demote another user.'
          });
      }
      if (req.decoded.roleId !== 1) {
        return res.status(401)
          .send({
            message: 'You cannot edit this user'
          });
      }
    }
    if (existingUser.id === 1 && req.body.roleId) {
      return res.status(403)
        .send({
          message: 'To avoid complications, this is forbidden!'
        });
    }
    if (req.body.roleId === '1' && existingUser.roleId !== 1) {
      if (req.decoded.roleId !== 1) {
        return res.status(401)
          .send({
            message: 'You cannot promote yourself to an admin.'
          });
      }
    }
    return existingUser.update(req.body, { fields: Object.keys(req.body) })
      .then(updatedUser => res.status(200).send(updatedUser));
  }
}
export default UserControllerHelper;
