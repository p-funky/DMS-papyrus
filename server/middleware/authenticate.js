import jwt from 'jsonwebtoken';
import model from '../models';

const Roles = model.Roles;

const secret = process.env.SECRET || 'secret';
/**
 * Class to implement authentication middlewares
 */
const authorization = {
  /**
   * Method to authenticate a user before proceeding
   * to protected routes
   * @param {Object} req - The req Object
   * @param {Object} res - The res Object
   * @param {Function} next - Function call to move to the next middleware
   * or endpoint controller
   * @return {Void} - Returns void
   */
  verifyToken(req, res, next) {
    const token = req.headers.authorization ||
      req.body.token || req.headers['x-access-token'];
    if (!token) {
      return res.status(401)
      .send({ message: 'You are not logged in' });
    }
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401)
            .send({ message: 'Failed to authenicate token' });
      }
      req.decoded = decoded;
      return next();
    });
  },
  /**
   * Method to verify that user is an Admin
   * to access Admin endpoints
   * @param {Object} req - req Object
   * @param {Object} res - res Object
   * @param {Object} next - Function to pass flow to the next controller
   * @return {Void} - returns Void
   */
  adminAccess(req, res, next) {
    Roles.findById(req.decoded.roleId)
      .then((theRole) => {
        if (theRole && theRole.title.toLowerCase() === 'admin') {
          return next();
        }
        return res.status(403)
          .send({ message: 'You are not authorized to view this content' });
      });
  }
};

module.exports = authorization;
