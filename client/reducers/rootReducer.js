import { combineReducers } from 'redux';
import authentication from './authentication';
import documents from './documents';
import users from './users';

export default combineReducers({
  authentication,
  documents,
  users
});
