import {
  GET_ALL_USERS,
} from '../actions/types';


const userReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return action.allUsers;
    default: return state;
  }
};

export default userReducer;
