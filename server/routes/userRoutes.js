import express from 'express';
import userController from '../controllers/userController';
import check from '../middleware/authenticate';


const user = express.Router();

user.route('/users/')
  .post(userController.create);

user.route('/users/login')
  .post(userController.login);

user.route('/users/logout')
  .post(check.verifyToken, userController.logout);

module.exports = () => user;
