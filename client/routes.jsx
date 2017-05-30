import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/app';
import Greetings from './components/greetings';
import SignupPage from './components/signup/signupPage';
import SignInpage from './components/signIn/signInPage';
import Footer from './components/footer';


export default (
  <div>
    <Route path="/" component={App} />
    <Route exact path="/" component={Greetings} />
    <Route exact path="/signup" component={SignupPage} />
    <Route exact path="/signin" component={SignInpage} />
    <Route path="/" component={Footer} />
  </div>
);
