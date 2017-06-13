import jwt from 'jsonwebtoken';
import model from '../models';

const User = model.User;
const Documents = model.Documents;

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
      if (existingUser && existingUser.email === req.body.email) {
        return res.status(409)
          .send({ message:
            `Email: ${req.body.email} is already in use` });
      }

      if (existingUser && existingUser.userName === req.body.userName) {
        return res.status(409)
          .send({ message:
            `Username: ${req.body.userName} is already in use` });
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
        existingUser = userDetails(existingUser);
        return res.status(200).send(existingUser);
      });
  },

  getAllUsers(req, res) {
    const limit = req.query.limit || '8';
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
    const limit = req.query.limit > 0 ? req.query.limit : '8';
    const offset = req.query.offset > 0 ? req.query.offset : '0';
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

  getUser(req, res) {
    const id = req.params.id;
    User.findById(id)
      .then((existingUser) => {
        existingUser = userDetails(existingUser);
        return res.status(200).send(existingUser);
      });
  },

  update(req, res) {
    const id = req.params.id;
    User.findById(id)
      .then((existingUser) => {
        if (Number(id) !== req.decoded.userId) {
          if (req.decoded.roleId === 1 && existingUser.id === 1) {
            return res.status(401)
              .send({
                message: 'You cannot edit this admin: the OGA at the top!!!'
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
        existingUser.update(req.body, { fields: Object.keys(req.body) })
          .then((updatedUser) => {
            updatedUser = userDetails(updatedUser);
            return res
              .status(200)
              .send(updatedUser);
          })
          .catch(error => res.status(400).send({
            Error: error.message
          }));
      });
  },

  destroy(req, res) {
    User.findById(req.params.id)
      .then((existingUser) => {
        const id = req.params.id;
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
          where: { ownerId: id }
        })
          .then((existingDocuments) => {
            if (existingDocuments.count) {
              return res.status(409)
                .send({
                  message: 'Cannot delete user while user still has documents'
                });
            }
            existingUser.destroy()
              .then(() => res.status(200)
                .send({
                  User: existingUser,
                  Message: 'User succesfully deleted'
                })
              );
          });
      });
  },

  find(req, res) {
    const limit = req.query.limit > 0 ? req.query.limit : '8';
    const offset = req.query.offset > 0 ? req.query.offset : '0';
    const searchInfo = req.query.search;
    const query = {
      attributes: ['id', 'firstName', 'lastName',
        'email', 'userName', 'roleId'],
      limit,
      offset,
      order: '"createdAt" ASC'
    };
    if (searchInfo) {
      query.where = {
        $and: {
          $or: [
            { firstName: { $iLike: `%${searchInfo}%` } },
            { lastName: { $iLike: `%${searchInfo}%` } },
            { userName: { $iLike: `%${searchInfo}%` } }
          ]
        }
      };
    }

    User.findAndCountAll(query)
      .then((users) => {
        const settings = limit && offset
          ? {
            totalCount: users.count,
            pages: Math.ceil(users.count / limit),
            currentPage: Math.floor(offset / limit) + 1,
            pageSize: users.rows.length
          } : null;
        res.send({ users: users.rows, settings });
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  }
};
