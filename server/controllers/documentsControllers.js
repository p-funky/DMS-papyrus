import model from '../models';
import documentsControllerHelper
  from '../helpers/controllers/documentsControllerHelper';

const Documents = model.Documents;
const User = model.User;
const getQueryList = documentsControllerHelper.getQueryList;
const extractDocuments = documentsControllerHelper.extractDocuments;
const retrieveDocuments = documentsControllerHelper.retrieveDocuments;
const updateDocument = documentsControllerHelper.updateDocument;
const getUserDocuments = documentsControllerHelper.getUserDocuments;
const getQuerySearch = documentsControllerHelper.getQuerySearch;

export default {
  /**
   * This method creates a document
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document
   */
  create(req, res) {
    req.body.ownerId = req.decoded.userId;
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
  },

  /**
   * This method gets all documents
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document
   */
  list(req, res) {
    const query = getQueryList(req);
    const result = extractDocuments(query, res);
    return result;
  },

  /**
   * This method gets a documents
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document
   */
  retrieve(req, res) {
    const id = req.params.id;
    Documents.findById(id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send({
              message: `There is no document with id: ${id}`
            });
        }
        const result = retrieveDocuments(document, res, req);
        return result;
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * This method updates a document
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document
   */
  update(req, res) {
    const id = req.params.id;
    return Documents.findById(id)
      .then((document) => {
        const result = updateDocument(document, res, req, id);
        return result;
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * This method deletes a document
   *
   * @param {object} req
   * @param {object} res
   * @returns {string} error, message
   */
  destroy(req, res) {
    const id = req.params.id;
    Documents.findById(id)
      .then((document) => {
        if (!document) {
          return res.status(404)
            .send(
            { message: `There is no document with id: ${id}` });
        }
        if (document.ownerId === req.decoded.userId ||
          req.decoded.roleId === 1) {
          document.destroy()
            .then(() => res.status(200)
              .send({
                message: 'Document successfully deleted',
                Document: document
              })
            )
            .catch(error => res.status(400).send({
              message: error.message
            }));
        } else {
          return res.status(403)
            .send({ message: 'You are not the owner of this document.' });
        }
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * This method gets all documents for a specific user
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document, message
   */
  listByUser(req, res) {
    const id = req.params.id;
    User.findById(id)
      .then((user) => {
        const result = getUserDocuments(user, res, req, id);
        return result;
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  },

  /**
   * This method gets all documents for a specific user
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} document, message
   */
  find(req, res) {
    const query = getQuerySearch(req);
    const result = extractDocuments(query, res);
    return result;
  }
};
