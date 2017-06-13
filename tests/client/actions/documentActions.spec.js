import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../../client/actions/types';
import { getAllDocuments, addDocumentSuccess, deleteDocumentSuccess,
  getMyDocuments, searchDocuments, deleteDocumentAction, editDocumentAction,
  getAllDocumentsAction, addDocumentAction, getmyDocumentsAction,
  myDocumentEditAction, searchDocumentsAction }
  from '../../../client/actions/documentActions';

const mockStore = configureMockStore([thunk]);

describe('Document Actions', () => {
  before(() => {
    function mockStorage() {
      const storage = {};
      return {
        setItem: (key, value) => {
          storage[key] = value || '';
        },
        getItem: key =>
          storage[key],
        removeItem: (key) => {
          delete storage[key];
        },
        get length() {
          return Object.keys(storage).length;
        },
        key: (i) => {
          const keys = Object.keys(storage);
          return keys[i] || null;
        }
      };
    }

    global.localStorage = mockStorage();
  });
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should get all documents', () => {
    const allDocuments = {};
    const expectedAction = {
      type: types.GET_ALL_DOCUMENTS,
      allDocuments
    };
    expect(getAllDocuments(allDocuments)).toEqual(expectedAction);
  });
  it('should add a document', () => {
    const document = {};
    const expectedAction = {
      type: types.ADD_DOCUMENT,
      document
    };
    expect(addDocumentSuccess(document)).toEqual(expectedAction);
  });
  it('should delete a document', () => {
    const document = {};
    const expectedAction = {
      type: types.DELETE_DOCUMENT,
      document
    };
    expect(deleteDocumentSuccess(document)).toEqual(expectedAction);
  });
  it('should get a user\'s documents', () => {
    const myDocuments = {};
    const expectedAction = {
      type: types.GET_MY_DOCUMENTS,
      myDocuments
    };
    expect(getMyDocuments(myDocuments)).toEqual(expectedAction);
  });
  it('should search for existing document(s)', () => {
    const documents = {};
    const expectedAction = {
      type: types.SEARCH_DOCUMENTS,
      documents
    };
    expect(searchDocuments(documents)).toEqual(expectedAction);
  });

  it('should create GET_ALL_USERS on request for list of users', () => {
    moxios.stubRequest(`/documents/?offset=${0}`, {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedActions = [{
      type: types.GET_ALL_DOCUMENTS,
      allDocuments: { data: {} }
    }];
    const store = mockStore();

    return store.dispatch(getAllDocumentsAction(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should call on all documents viewable to the user on adding of document',
  () => {
    moxios.stubRequest('/documents/', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedState = {};
    const store = mockStore();

    return store.dispatch(addDocumentAction())
      .then(() => {
        expect(store.getState()).toEqual(expectedState);
      });
  });
  it('should call on all documents viewable to the user on editing of document',
  () => {
    moxios.stubRequest('/documents/2', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedState = {};
    const store = mockStore();

    return store.dispatch(editDocumentAction(2))
      .then(() => {
        expect(store.getState()).toEqual(expectedState);
      });
  });
  it('should create DELETE_DOCUMENT on request to delete a document', () => {
    moxios.stubRequest('/documents/5', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedActions = [{
      type: types.DELETE_DOCUMENT,
      document: { data: {} }
    }];
    const store = mockStore();

    return store.dispatch(deleteDocumentAction(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should create GET_MY_DOCUMENTS on request to view user documents', () => {
    moxios.stubRequest('users/5/documents/offset=0', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedActions = [{
      type: types.GET_MY_DOCUMENTS,
      myDocuments: { data: {} }
    }];
    const store = mockStore();

    store.dispatch(getmyDocumentsAction(5))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should call on get my documents of the user on editing of user document',
  () => {
    moxios.stubRequest('users/2/documents/offset=0', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedAction = [];
    const store = mockStore();

    store.dispatch(myDocumentEditAction())
      .then(() => {
        expect(store.getAction()).toEqual(expectedAction);
      });
  });
  it('should create SEARCH_USERS on request to search for users', () => {
    moxios.stubRequest(`/search/users/?search=${'searchWord'}`, {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedActions = [{
      type: types.SEARCH_DOCUMENTS,
      documents: { data: {} }
    }];
    const store = mockStore();

    store.dispatch(searchDocumentsAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
