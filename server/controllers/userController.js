import jwt from 'jsonwebtoken';
import model from '../models';

const User = model.User;

const secret = process.env.SECRET_TOKEN || 'secret';
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

  create(req, res) {
    User.findOne({
      where: {
        $or: [
          { email: req.body.email },
          { userName: req.body.userName }
        ]
      }
    })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(409)
          .send({ message:
            `Email: ${req.body.email} or Username: ` +
            `${req.body.userName} is already in use` });
      }

      const createUser = () =>
        User.create(req.body)
          .then((newUser) => {
            const token = jwt.sign({
              userId: newUser.id,
              roleId: newUser.roleId,
              firstName: newUser.firstName,
            }, secret, { expiresIn: '2 days' });
            newUser = userDetails(newUser);
            return res.status(201)
              .send({ newUser, token, expiresIn: '2 days' });
          })
          .catch(error => res.status(400).json({ error }));

      createUser();
    });
  },

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
      });
    } else {
      return res.status(400)
        .send({ message: 'Incomplete login details' });
    }
  },

  logout(req, res) {
    return res.status(200)
      .send({ message: 'Logout successful' });
  },

  profile(req, res) {
    const id = req.decoded.userId;
    User.findById(id)
      .then((existingUser) => {
        if (!existingUser) {
          return res
          .status(404)
          .send({ message: 'User Not Found' });
        }
        existingUser = userDetails(existingUser);
        return res.status(200).send(existingUser);
      });
  },

  getAllUsers(req, res) {
    const limit = req.query.limit || '10';
    const offset = req.query.offset || '0';
    User.findAndCountAll({
      limit,
      offset,
      order: '"createdAt" ASC'
    }).then((user) => {
      const settings = limit && offset ? {
        totalCount: user.count,
        pages: Math.ceil(user.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: user.rows.length
      } : null;
      return res.status(200).send({ users: user.rows, settings });
    })
    .catch(error => res.status(400).send({
      Error: error.message
    }));
  },

  getAllAdmin(req, res) {
    const limit = req.query.limit || '10';
    const offset = req.query.offset || '0';
    User.findAndCountAll({
      limit,
      offset,
      order: '"createdAt" ASC',
      where: {
        roleId: 1
      }
    }).then((user) => {
      const settings = limit && offset ? { totalCount: user.count,
        pages: Math.ceil(user.count / limit),
        currentPage: Math.floor(offset / limit) + 1,
        pageSize: user.rows.length } : null;
      return res.status(200).send({ users: user.rows, settings });
    });
  },
};
