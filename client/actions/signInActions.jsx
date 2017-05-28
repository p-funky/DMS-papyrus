import axios from 'axios';

export const userSignInRequest = userData =>
  dispatch => axios.post('/users/login', userData);
