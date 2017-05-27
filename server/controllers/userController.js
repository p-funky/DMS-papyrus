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
  }
};
