import axios from 'axios';
import {
  GET_ALL_USERS,
  GET_PROFILE,
  DELETE_USER,
  DELETE_ACCOUNT,
  SEARCH_USER
} from './types';

export const getAllUsers = allUsers => ({
  type: GET_ALL_USERS,
  allUsers
});

export const getAllUsersAction = offset => dispatch =>
  axios.get(`/users/?offset=${offset}`)
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
    .catch(error => console.log(error.response.data.message));

export const editProfileAction = (userId, userDetails) => dispatch =>
  axios.put(`/users/${userId}`, userDetails)
    .then(() => {
      dispatch(getProfileAction());
    })
    .catch(error => console.log(error));

export const deleteUser = user => ({
  type: DELETE_USER,
  user
});

export const deleteUserAction = userId => dispatch =>
  axios.delete(`/users/${userId}`)
    .then(() => {
      dispatch(getAllUsersAction());
    })
    .catch(error => console.log(error));

export const editUserRoleAction = (userId, userDetails) => dispatch =>
  axios.put(`/users/${userId}`, userDetails)
    .then(() => {
      dispatch(getAllUsersAction(0));
    })
    .catch(error => console.log(error));

export const deleteSelf = profile => ({
  type: DELETE_ACCOUNT,
  profile
});

export const logOutAction = () =>
  axios.post('/users/logout')
    .then(() => {
      localStorage.removeItem('token');
    })
    .catch(error => console.log(error));

export const deleteSelfAction = userId => dispatch =>
  axios.delete(`/users/${userId}`)
    .then(() => {
      dispatch(logOutAction());
    })
    .catch(error => console.log(error));


export const searchUser = users => ({
  type: SEARCH_USER,
  users
});

export const searchUserAction = searchWord => dispatch =>
  axios.get(`/search/users/?search=${searchWord}`)
    .then((success) => {
      console.log(success.data);
      dispatch(searchUser(success.data));
    })
    .catch(error => console.log(error));
