import express from 'express';
import documentController from '../controllers/documentsControllers';
import check from '../middleware/authenticate';

const document = express.Router();

document.route('/documents/')
  .get(check.verifyToken, documentController.list)
  .post(check.verifyToken, documentController.create);

document.route('/documents/:id')
  .get(check.verifyToken, documentController.retrieve);

module.exports = () => document;
