import express from 'express';
import userController from '../controllers/userController';

const user = express.Router();

user.route('/users/')
  .post(userController.create);

user.route('/users/login')
  .post(userController.login);

module.exports = () => user;
