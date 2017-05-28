import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/app';
import Greetings from './components/greetings';
import Footer from './components/footer';


export default (
  <div>
    <Route path="/" component={App} />
    <Route exact path="/" component={Greetings} />
    <Route path="/" component={Footer} />
  </div>
);
