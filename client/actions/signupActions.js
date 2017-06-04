import axios from 'axios';

export const userSignupRequest = userData =>
  dispatch => axios.post('users/', userData);
