import {
  GET_ALL_DOCUMENTS,
  ADD_DOCUMENT,
  DELETE_DOCUMENT,
  GET_MY_DOCUMENTS,
  SEARCH_DOCUMENTS
} from '../actions/types';

let documents;

const documentReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_ALL_DOCUMENTS:
      return action.allDocuments;

    case DELETE_DOCUMENT:
      documents = state.documents
        .filter(document => document.id !== action.document.Document.id);
      return {
        documents,
        settings: state.settings
      };

    case ADD_DOCUMENT:
      documents = [...state.documents, action.document];
      return {
        settings: state.settings,
        documents
      };

    case GET_MY_DOCUMENTS:
      return action.myDocuments;

    case SEARCH_DOCUMENTS:
      return action.documents;

    default: return state;
  }
};

export default documentReducer;
