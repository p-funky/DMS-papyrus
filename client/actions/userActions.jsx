import axios from 'axios';
import {
  GET_ALL_USERS
} from './types';

export const getAllUsers = allUsers => ({
  type: GET_ALL_USERS,
  allUsers,
});

export const getAllUsersAction = () => dispatch =>
  axios.get('/users/')
    .then((success) => {
      dispatch(getAllUsers(success.data));
    })
    .catch(error => console.log(error));
