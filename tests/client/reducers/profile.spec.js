import expect from 'expect';
import profileReducer from '../../../client/reducers/profile';
import { getProfile } from '../../../client/actions/userActions';

describe('Profile reducer ', () => {
  const state = { profile: {} };
  it('gets a logged in user\'s profile', () => {
    const profile = { userName: 'Jegede', roleId: 1 };

    const action = getProfile(profile);
    const newState = profileReducer(state, action);
    expect(newState.userName).toEqual('Jegede');
    expect(newState.roleId).toEqual(1);
  });
});
