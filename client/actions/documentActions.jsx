import axios from 'axios';
import {
  GET_ALL_DOCUMENTS,
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  EDIT_DOCUMENT
} from './types';

export const getAllDocuments = allDocuments => ({
  type: GET_ALL_DOCUMENTS,
  allDocuments,
});

export const deleteDocumentSuccess = document => ({
  type: DELETE_DOCUMENT,
  document,
});

export const editDocumentSuccess = document => ({
  type: EDIT_DOCUMENT,
  document,
});

export const addDocumentSuccess = document => ({
  type: ADD_DOCUMENT,
  document,
});

export const getAllDocumentsAction = () => dispatch =>
  axios.get('/documents/')
    .then((success) => {
      dispatch(getAllDocuments(success.data));
    })
    .catch(() => {
      // console.log('error: ', error);
    });

export const deleteDocumentAction = documentId => dispatch =>
  axios.delete(`/documents/${documentId}`)
    .then((success) => {
      dispatch(deleteDocumentSuccess(success.data));
    })
    .catch(error => console.log(error));

export const editDocumentAction = (documentId, documentDetails) => dispatch =>
  axios.put(`/documents/${documentId}`, documentDetails)
    .then(() => {
      dispatch(getAllDocumentsAction());
    })
    .catch(error => console.log(error));

export const addDocumentAction = documentDetails => dispatch =>
  axios.post('/documents/', documentDetails)
    .then((success) => {
      dispatch(addDocumentSuccess(success.data));
    })
    .catch(error => console.log(error));
