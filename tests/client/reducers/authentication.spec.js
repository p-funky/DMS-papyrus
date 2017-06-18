import expect from 'expect';
import authentication from '../../../client/reducers/authentication';
import { setCurrentUser } from '../../../client/actions/signInActions';

describe('Authentication reducers ', () => {
  const state = { isAuthenticated: false, userInfo: {} };
  it('sets current user details in state on sign up', () => {
    const userInfo = {
      firstName: 'Olowojobe',
      lastName: 'Jegede',
      userName: 'Olobe',
      email: 'olowo@gmail.com',
      password: 'olobe'
    };

    const action = setCurrentUser(userInfo);
    const newState = authentication(state, action);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.userInfo.userName).toEqual('Olobe');
    expect(newState.userInfo.password).toEqual('olobe');
  });

  it('sets current user details in state on sign in', () => {
    const userInfo = { userName: 'Olobe', password: 'olobe' };

    const action = setCurrentUser(userInfo);
    const newState = authentication(state, action);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.userInfo.userName).toEqual('Olobe');
  });
});
