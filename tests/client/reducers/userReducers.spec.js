// import expect from 'expect';
// import users from '../../../client/reducers/users';
// import * as types from '../../../client/actions/types';

// describe('Users Reducer', () => {
//   it('should set user profile when passed SET_CURRENT_USER', () => {
//     // let state;
//     // state = reducers({authentication:[]}, {type:'SET_CURRENT_USER',userInfo:{id:1,firstName:'Adeyinka',lastName:'Alabi',email:'adeyinka.alabi@andela.com',userName:'Pfunky',password:'$2a$10$w7SJdnGERQPQo4hwPbKy9O3DpJq0IroGJArdsACPGS6n6QNQd59Ui',roleId:1,createdAt:'2017-06-11T09:49:44.580Z',updatedAt:'2017-06-11T09:49:44.580Z'}});
//     // expect(state).toEqual({authentication:{isAuthenticated:true,userInfo:{id:1,firstName:'Adeyinka',lastName:'Alabi',email:'adeyinka.alabi@andela.com',userName:'Pfunky',password:'$2a$10$w7SJdnGERQPQo4hwPbKy9O3DpJq0IroGJArdsACPGS6n6QNQd59Ui',roleId:1,createdAt:'2017-06-11T09:49:44.580Z',updatedAt:'2017-06-11T09:49:44.580Z'}},documents:{},users:{},profile:{}});
//     // arrange
//     const initialState = {
//       authentication: []
//     };
//     const currentUser = { username: 'Pfunky' };
//     const action = { type: types.SET_CURRENT_USER, userInfo: currentUser };

//     // act
//     const newState = users(initialState, action);

//     expect(newState.authentication.userInfo.userName)
//       .toEqual(currentUser.userName);
//   });
// });
