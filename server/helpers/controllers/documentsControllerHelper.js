import models from '../../models';
import paginate from '../pagination';

const Documents = models.Documents;
const User = models.User;

/**
 * This classs contains helpers methids for the document controller
 *
 * @class DocumentControllerHelper
 */
class DocumentControllerHelper {

  /**
   * The method dynamically creates the query for the document list controller
   *
   * @static
   * @param {object} req
   * @returns {object} query
   *
   * @memberof DocumentControllerHelper
   */
  static getQueryList(req) {
    const limit = req.query.limit > 0 ? req.query.limit : '8';
    const offset = req.query.offset > 0 ? req.query.offset : '0';
    const query = {};
    query.limit = limit;
    query.offset = offset;
    const id = req.decoded.userId;
    const roleId = req.decoded.roleId;
    if (roleId === 1) {
      query.where = {};
    } else {
      query.where = {
        $or: [
          // public
          { accessId: 1 },
          // your own - private inclusive
          { ownerId: id },
          { $and: [
            // role
            { accessId: 3 },
            // check if your role is same as document owner's role
            { '$User.roleId$': roleId }
          ]
          },
        ],
      };
    }
    return query;
  }

  /**
   * This method checks if there are documents to be shown
   * in the document list controller
   *
   * @static
   * @param {object} document
   * @param {res} res the response object
   * @param {limit} limit
   * @param {offset} offset
   * @returns {object} document and/or message
   *
   * @memberof DocumentControllerHelper
   */
  static listDocuments(document, res, limit, offset) {
    const rows = document.rows;
    const count = document.count;
    const settings = paginate(rows, count, limit, offset);
    return res.status(200).send({
      documents: rows, settings
    });
  }

  /**
   * This method returns only the documents a user is authorized
   * to view from another user's portfolio
   *
   * @static
   * @param {object} user
   * @param {object} res the response object
   * @param {object} req the request object
   * @param {object} id the document owner id
   * @returns {object} document and/or message
   *
   * @memberof DocumentControllerHelper
   */
  static getUserDocuments(user, res, req, id) {
    const limit = req.query.limit > 0 ? req.query.limit : '8';
    const offset = req.query.offset > 0 ? req.query.offset : '0';
    let name;
    let response;
    User.findById(id)
      .then((existingUser) => {
        if (!existingUser) {
          return res
            .status(404)
            .send({ message: `There is no user with id: ${id}` });
        }
        name = existingUser ? existingUser.userName : '';
        // if admin or owner
        if (req.decoded.roleId === 1 || Number(id) === req.decoded.userId) {
          Documents.findAndCountAll({
            include: [{
              model: User,
              attributes: ['userName', 'roleId']
            }],
            // all of the owner's documents
            where: { ownerId: id },
            limit,
            offset,
            order: '"createdAt" ASC'
          })
          .then((documents) => {
            if (!documents.count) {
              return res
                .status(404)
                .send({
                  message: `User ${name} with id: ${id}` +
                  ' has no documents to view'
                });
            }
            response = DocumentControllerHelper
              .listDocuments(documents, res, limit, offset);
          });
        } else {
          response = res
            .status(401)
            .send({ message: 'You are not authorized to view this.' });
        }
      })
      .catch(error => res.status(400).send({ message: error.message }));
    return response;
  }

  /**
   * This method returns only the documents a user is authorized
   * to view
   *
   * @static
   * @param {object} document
   * @param {object} res the response object
   * @param {object} req the request object
   * @returns {object} status and message
   *
   * @memberof DocumentControllerHelper
   */
  static retrieveDocuments(document, res, req) {
    // if admin
    if (req.decoded.roleId === 1) {
      return res.status(200)
        .send(document);
    }
    // if document is public
    if (document.accessId === 1) {
      return res.status(200)
        .send(document);
    }
    // if document is private and person requesting is the owner
    if ((document.accessId === 2) &&
      (document.ownerId === req.decoded.userId)) {
      return res.status(200)
        .send(document);
    }
    // if document has role acess
    if (document.accessId === 3) {
      User.findById(document.ownerId)
        .then((owner) => {
          // if owner role is same as requester's role
          if (owner.roleId === req.decoded.roleId) {
            return res.status(200)
              .send(document);
          }
          // if owner role is different from requester's role
          return res.status(403)
            .send({
              message: 'You are not permitted to access this document.'
            });
        });
    } else {
      // if document is private and person requesting is neither owner nor admin
      return res.status(403)
        .send({
          message: 'Private! You are not permitted to access this document. '
          + 'Request access from admin'
        });
    }
  }

  /**
   * This method updates a document
   *
   * @static
   * @param {object} document
   * @param {object} res the response object
   * @param {object} req the request object
   * @param {object} id the request object
   * @returns {object} document and/or message
   *
   * @memberof DocumentControllerHelper
   */
  static updateDocument(document, res, req, id) {
    let response = {};
    if (!document) {
      return res.status(404)
        .send({ message: `There is no document with id: ${id}` });
    }
    if (document.ownerId !== req.decoded.userId) {
      return res.status(401).send({
        message: 'You do not own this document'
      });
    }
    const userInfo = {};
    let documentInfo = {};
    User.findById(document.ownerId)
      .then((owner) => {
        userInfo.userName = owner.userName;
        userInfo.roleId = owner.roleId;
        response = document.update(req.body, { fields: Object.keys(req.body) })
          .then(() => {
            documentInfo = document.dataValues;
            documentInfo.User = userInfo;
            res.status(200).send(documentInfo);
          })
          .catch(error => res.status(400).send({
            message: error.message
          }));
      });
    return response;
  }

  /**
   * The method dynamically creates the query for the document list controller
   *
   * @static
   * @param {object} req
   * @returns {object} query
   *
   * @memberof DocumentControllerHelper
   */
  static getQuerySearch(req) {
    const searchInfo = req.query.search;
    const query = DocumentControllerHelper.getQueryList(req);
    if (searchInfo) {
      if (req.decoded.roleId === 1) {
        query.where = {
          $or: [
            { title: { $iLike: `%${searchInfo}%` } },
            { content: { $iLike: `%${searchInfo}%` } }
          ]
        };
      } else {
        query.where.$and = [{
          $or: [
            { title: { $iLike: `%${searchInfo}%` } },
            { content: { $iLike: `%${searchInfo}%` } }
          ]
        }];
      }
    }
    return query;
  }

  /**
   * The method extracts documents from the database
   *
   * @static
   * @param {object} query
   * @param {object} res
   * @returns {object} documents
   *
   * @memberof DocumentControllerHelper
   */
  static extractDocuments(query, res) {
    const limit = query.limit;
    const offset = query.offset;
    const where = query.where;
    Documents.findAndCountAll({
      include: [{
        model: User,
        attributes: ['userName', 'roleId'] }],
      where,
      limit,
      offset,
      order: '"createdAt" DESC'
    })
    .then((document) => {
      const result = DocumentControllerHelper
        .listDocuments(document, res, limit, offset);
      return result;
    });
  }
}

export default DocumentControllerHelper;
