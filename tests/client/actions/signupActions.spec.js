import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as types from '../../../client/actions/types';
import * as signUpAction from '../../../client/actions/signupActions';


const mockStore = configureMockStore([thunk]);

describe('SIGN UP ACTION:', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  it('should set current user', () => {
    const userInfo = {};
    const expectedAction = {
      type: types.SET_CURRENT_USER,
      userInfo
    };
    expect(signUpAction.setCurrentUser(userInfo)).toEqual(expectedAction);
  });

  it('creates SET_CURRENT_USER when user signs up', () => {
    moxios.stubRequest('/users/', {
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

    store.dispatch(signUpAction.userSignupRequest())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
