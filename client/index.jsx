/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import './css/styles.scss';
import routes from './routes';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

render(
  <Provider store={store}>
    <Router>
      { routes }
    </Router>
  </Provider>
  ,
  document.getElementById('app'));
