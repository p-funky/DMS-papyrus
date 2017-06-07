/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
// import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';
import attachAuthorizationToken from './utils/attachToken';
import { setCurrentUser } from './actions/signInActions';
import store from './store/configureStore';

import './css/styles.scss';
import routes from './routes';

(function setToken() {
  if (localStorage.token) {
    attachAuthorizationToken(
    localStorage.token
    );
    store.dispatch(setCurrentUser(
      jwt.decode(localStorage.token)
    ));
  }
}());


render(
  <Provider store={store}>
    <Router>
      { routes }
    </Router>
  </Provider>
  ,
  document.getElementById('app'));
