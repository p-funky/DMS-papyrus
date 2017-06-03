import {
  GET_PROFILE
} from '../actions/types';


const profileReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case GET_PROFILE:
      return action.profile;
    default: return state;
  }
};

export default profileReducer;
