import axios from 'axios';
import {
  GET_ALL_USERS
} from './types';

export const getAllDocuments = allUsers => ({
  type: GET_ALL_USERS,
  allUsers,
});
