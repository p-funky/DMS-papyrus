import express from 'express';
import userController from '../controllers/userController';

const user = express.Router();

user.route('/users/')
  .post(userController.create);

module.exports = () => user;
