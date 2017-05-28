import model from '../models';

const Documents = model.Documents;
const User = model.User;

export default {
  create(req, res) {
    req.body.ownerId = req.decoded.userId;
    Documents.findAll({
      where: {
        $and: {
          ownerId: req.decoded.userId,
          title: req.body.title
        }
      }
    })
    .then((document) => {
      if (document.length) {
        return res.status(409)
          .send({
            message: 'Note: Document with same title or content exists. ' +
            'Please modify title.'
          });
      }
      const userInfo = {};
      let documentInfo = {};
      Documents.create(req.body)
        .then((newDocument) => {
          User.findById(newDocument.ownerId)
            .then((owner) => {
              userInfo.userName = owner.userName;
              userInfo.roleId = owner.roleId;
              documentInfo = newDocument.dataValues;
              documentInfo.User = userInfo;
              res.status(201).send(documentInfo);
            });
        })
        .catch(error => res.status(400).send({
          message: error.message
        }));
    });
  },
};
