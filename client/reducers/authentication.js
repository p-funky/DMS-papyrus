import isEmpty from 'lodash/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';

const authReducer = (state = [], action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.userInfo),
        userInfo: action.userInfo,
      };
    default: return state;
  }
};

export default authReducer;
