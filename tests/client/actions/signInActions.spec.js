import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../../client/actions/types';
import * as signInAction from '../../../client/actions/signInActions';


const mockStore = configureMockStore([thunk]);

describe('SIGN IN ACTION:', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('should set current user', () => {
    const userInfo = {};
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      userInfo
    };
    expect(signInAction.setCurrentUser(userInfo)).toEqual(expectedAction);
  });

  it('creates SET_CURRENT_USER when user logs in', () => {
    moxios.stubRequest('/users/login/', {
      status: 200,
      response: {
        userInfo: {}
      }
    });
    const expectedActions = [{
      type: types.SET_CURRENT_USER,
      userInfo: null
    }];
    const store = mockStore();

    store.dispatch(signInAction.userSignInRequest())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});


