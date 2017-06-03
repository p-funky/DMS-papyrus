import axios from 'axios';
import {
  GET_ALL_USERS,
  GET_PROFILE
} from './types';

export const getAllUsers = allUsers => ({
  type: GET_ALL_USERS,
  allUsers
});

export const getAllUsersAction = () => dispatch =>
  axios.get('/users/')
    .then((success) => {
      dispatch(getAllUsers(success.data));
    })
    .catch(error => console.log(error));

export const getProfile = profile => ({
  type: GET_PROFILE,
  profile
});

export const getProfileAction = () => dispatch =>
  axios.get('/users/profile')
    .then((success) => {
      dispatch(getProfile(success.data));
    })
    .catch(error => console.log(error));

export const editProfileAction = (userId, userDetails) => dispatch =>
  axios.put(`/users/${userId}`, userDetails)
    .then(() => {
      dispatch(getProfileAction());
    })
    .catch(error => console.log(error));
