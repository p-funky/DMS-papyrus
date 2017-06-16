import expect from 'expect';
import * as types from '../../../client/actions/types';
import userReducer from '../../../client/reducers/users';

describe('Users reducer', () => {
  it('should handle GET_ALL_USERS', () => {
    expect(userReducer([], { type: types.GET_ALL_USERS, allUsers: { count: 10 },
    }))
    .toEqual({ count: 10 });
  });

  it('should handle SEARCH_USERS', () => {
    expect(userReducer([], { type: types.SEARCH_USERS, users: { totalCount: 2 },
    }))
    .toEqual({ totalCount: 2 });
  });

  it('should handle DELETE_USER', () => {
    expect(userReducer({ users: [{ userName: 'Jegede', roleId: 1, id: 1 }] },
      { type: types.DELETE_USER, user: { User: { id: 1 } } })
    ).toEqual({ settings: undefined, users: [] });
  });
});
