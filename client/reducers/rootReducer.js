import { combineReducers } from 'redux';
import authentication from './authentication';
import documents from './documents';

export default combineReducers({
  authentication,
  documents
});
