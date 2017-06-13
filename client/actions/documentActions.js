import axios from 'axios';
import {
  GET_ALL_DOCUMENTS,
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  GET_MY_DOCUMENTS,
  SEARCH_DOCUMENTS
} from './types';

export const getAllDocuments = allDocuments => ({
  type: GET_ALL_DOCUMENTS,
  allDocuments,
});

export const getAllDocumentsAction = (offset = 0) => dispatch =>
  axios.get(`/documents/?offset=${offset}`)
    .then((success) => {
      dispatch(getAllDocuments(success.data));
    })
    .catch(error => console.log(error));

export const addDocumentSuccess = document => ({
  type: ADD_DOCUMENT,
  document,
});

export const addDocumentAction = documentDetails => dispatch =>
  axios.post('/documents/', documentDetails)
    .then((success) => {
      dispatch(addDocumentSuccess(success.data));
      dispatch(getAllDocumentsAction());
    })
    .catch(error => console.log(error));

export const deleteDocumentSuccess = document => ({
  type: DELETE_DOCUMENT,
  document,
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

export const getMyDocuments = myDocuments => ({
  type: GET_MY_DOCUMENTS,
  myDocuments,
});


export const getmyDocumentsAction = (userId, offset) => dispatch =>
  axios.get(`/users/${userId}/documents/?offset=${offset}`)
    .then((success) => {
      dispatch(getMyDocuments(success.data));
    })
    .catch(error => console.log(error));

export const myDocumentEditAction = (documentId, userId, documentDetails) =>
  dispatch =>
    axios.put(`/documents/${documentId}`, documentDetails)
      .then(() => {
        dispatch(getmyDocumentsAction(userId));
      })
      .catch(error => console.log(error));

export const searchDocuments = documents => ({
  type: SEARCH_DOCUMENTS,
  documents
});

export const searchDocumentsAction = searchWord => dispatch =>
  axios.get(`/search/documents/?search=${searchWord}`)
    .then((success) => {
      dispatch(searchDocuments(success.data));
    })
    .catch(error => console.log(error));
