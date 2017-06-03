import {
  GET_ALL_USERS,
  GET_PROFILE
} from '../actions/types';


const userReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers;
    case GET_PROFILE:
      return action.profile;
    default: return state;
  }
};

export default userReducer;
