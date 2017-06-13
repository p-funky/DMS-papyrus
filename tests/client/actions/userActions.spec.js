import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';
import * as types from '../../../client/actions/types';
import { getAllUsers, getProfile, deleteUser, deleteSelf, searchUsers,
  getAllUsersAction, getProfileAction, deleteUserAction, editUserRoleAction,
  deleteSelfAction, editProfileAction, logOutAction, searchUserAction }
  from '../../../client/actions/userActions';

const mockStore = configureMockStore([thunk]);

describe('User Actions', () => {
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
  it('should get all users\' information', () => {
    const allUsers = {};
    const expectedAction = {
      type: types.GET_ALL_USERS,
      allUsers
    };
    expect(getAllUsers(allUsers)).toEqual(expectedAction);
  });
  it('should get the profile of the current user', () => {
    const profile = {};
    const expectedAction = {
      type: types.GET_PROFILE,
      profile
    };
    expect(getProfile(profile)).toEqual(expectedAction);
  });
  it('should get the profile of the current user', () => {
    const user = {};
    const expectedAction = {
      type: types.DELETE_USER,
      user
    };
    expect(deleteUser(user)).toEqual(expectedAction);
  });
  it('should delete the account of the current user', () => {
    const profile = {};
    const expectedAction = {
      type: types.DELETE_ACCOUNT,
      profile
    };
    expect(deleteSelf(profile)).toEqual(expectedAction);
  });
  it('should search for existing user(s)', () => {
    const users = {};
    const expectedAction = {
      type: types.SEARCH_USERS,
      users
    };
    expect(searchUsers(users)).toEqual(expectedAction);
  });

  it('should create GET_ALL_USERS on request for list of users', () => {
    moxios.stubRequest(`/users/?offset=${0}`, {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedActions = [{
      type: types.GET_ALL_USERS,
      allUsers: { data: {} }
    }];
    const store = mockStore();

    return store.dispatch(getAllUsersAction(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should create GET_PROFILE on request for user\'s profile', () => {
    moxios.stubRequest('/users/profile', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedActions = [{
      type: types.GET_PROFILE,
      profile: { data: {} }
    }];
    const store = mockStore();

    return store.dispatch(getProfileAction(0))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should call get user\'s profile on user update', () => {
    moxios.stubRequest('/users/2', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedState = {};
    const store = mockStore();

    return store.dispatch(editProfileAction(2))
      .then(() => {
        expect(store.getState()).toEqual(expectedState);
      });
  });

  it('should call on all users on delete request by admin', () => {
    moxios.stubRequest('/users/2', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedState = {};
    const store = mockStore();

    return store.dispatch(deleteUserAction(2))
      .then(() => {
        expect(store.getState()).toEqual(expectedState);
      });
  });

  it('should call on all users on edit role request by admin', () => {
    moxios.stubRequest('/users/2', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedState = {};
    const store = mockStore();

    return store.dispatch(editUserRoleAction(2))
      .then(() => {
        expect(store.getState()).toEqual(expectedState);
      });
  });

  it('should logout user on request to be deleted', () => {
    moxios.stubRequest('/users/2', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedState = {};
    const store = mockStore();

    store.dispatch(deleteSelfAction())
      .then(() => {
        expect(store.getState()).toEqual(expectedState);
      });
  });

  it('should logout a user on request to log out', () => {
    moxios.stubRequest('/users/logout', {
      status: 200,
      response: {
        data: {}
      }
    });

    const expectedState = {};
    const store = mockStore();

    return store.dispatch(logOutAction())
      .then(() => {
        expect(store.getState()).toEqual(expectedState);
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
      type: types.SEARCH_USERS,
      users: { data: {} }
    }];
    const store = mockStore();

    store.dispatch(searchUserAction())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
