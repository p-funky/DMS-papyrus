import jwt from 'jsonwebtoken';
import model from '../models';
import userControllerHelper
  from '../helpers/controllers/userControllerHelper';

require('dotenv')
  .config();

const User = model.User;
const extractUsers = userControllerHelper.extractUsers;
const canUpdate = userControllerHelper.canUpdate;
const canDelete = userControllerHelper.canDelete;
const secret = process.env.SECRET_TOKEN;
const userDetails = user => (
  {
    id: user.id,
    userName: user.userName,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    roleId: user.roleId
  });

export default {

  /**
   * This method creates a user
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user
   */
  create(req, res) {
    User.create(req.body)
      .then((newUser) => {
        const token = jwt.sign({
          userId: newUser.id,
          roleId: newUser.roleId,
          userName: newUser.userName,
        }, secret, { expiresIn: '2 days' });
        newUser = userDetails(newUser);
        return res.status(201)
          .send({ newUser, token, expiresIn: '2 days' });
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * This method logs a user in
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user
   */
  login(req, res) {
    if ((req.body.email || req.body.userName) && req.body.password) {
      User.findOne({
        where: {
          $or: [
            { email: req.body.email },
            { userName: req.body.userName }
          ]
        }
      })
      .then((existingUser) => {
        if (!existingUser) {
          return res.status(400)
          .send({
            message: 'This user is not registered. Kindly register'
          });
        }
        if (existingUser && existingUser.isPassword(req.body.password)) {
          const token = jwt.sign({
            userName: existingUser.userName,
            userId: existingUser.id,
            roleId: existingUser.roleId
          }, secret, { expiresIn: '2 days' });
          existingUser = userDetails(existingUser);
          return res.status(200)
            .send({
              message: 'Login successful',
              existingUser,
              token,
              expiresIn: '2 days'
            });
        }
        return res.status(401)
          .send({ message: 'Please double check email/username & password' });
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
    } else {
      return res.status(400)
        .send({ message: 'Incomplete login details' });
    }
  },

  /**
   * This method logs out a users
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} message
   */
  logout(req, res) {
    return res.status(200)
      .send({ message: 'Logout successful' });
  },

  /**
   * This method gets a user's profile details
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user details
   */
  profile(req, res) {
    const id = req.decoded.userId;
    User.findById(id)
      .then((existingUser) => {
        existingUser = userDetails(existingUser);
        return res.status(200).send(existingUser);
      });
  },

  /**
   * This method gets all users
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user
   */
  getAllUsers(req, res) {
    const result = extractUsers(req, res);
    return result;
  },

  /**
   * This method gets a user
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user
   */
  getUser(req, res) {
    const id = req.params.id;
    User.findById(id)
      .then((existingUser) => {
        existingUser = userDetails(existingUser);
        return res.status(200).send(existingUser);
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * This method updates a user
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user
   */
  update(req, res) {
    const id = req.params.id;
    User.findById(id)
      .then((existingUser) => {
        const toBeUpdated = canUpdate(existingUser, id, req, res);
        const updated = userDetails(toBeUpdated);
        return updated;
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * This method deletes a user
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} message
   */
  destroy(req, res) {
    User.findById(req.params.id)
      .then((existingUser) => {
        const id = req.params.id;
        const deleted = canDelete(existingUser, id, req, res);
        return deleted;
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * This method searches for all users that match a search query
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} user, message
   */
  find(req, res) {
    const searchInfo = req.query.search;
    if (searchInfo) {
      req.where = {
        $and: {
          $or: [
            { firstName: { $iLike: `%${searchInfo}%` } },
            { lastName: { $iLike: `%${searchInfo}%` } },
            { userName: { $iLike: `%${searchInfo}%` } }
          ]
        }
      };
    }
    const result = extractUsers(req, res);
    return result;
  }
};
