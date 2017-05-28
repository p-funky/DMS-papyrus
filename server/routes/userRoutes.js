import express from 'express';
import userController from '../controllers/userController';
import check from '../middleware/authenticate';


const user = express.Router();

user.route('/users/')
  .get(check.verifyToken,
    check.adminAccess, userController.getAllUsers)
  .post(userController.create);

user.route('/users/login')
  .post(userController.login);

user.route('/users/logout')
  .post(check.verifyToken, userController.logout);

user.route('/users/profile')
  .get(check.verifyToken, userController.profile);

user.route('/users/admin')
  .get(check.verifyToken, check.adminAccess, userController.getAllAdmin);

user.route('/users/:id')
  .get(check.verifyToken, userController.getUser)
  .put(check.verifyToken, userController.update)
  .delete(check.verifyToken, userController.destroy);
module.exports = () => user;
