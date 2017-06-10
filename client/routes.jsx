import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/app';
import Greetings from './components/greetings';
import SignupPage from './components/signup/signupPage';
import SignInpage from './components/signIn/signInPage';
import DashboardPage from './components/dashboard/dashboardPage';
import UsersPage from './components/users/usersPage';
import Footer from './components/footer';
import ProfilePage from './components/profile/profilePage';
import MyDocumentsPage from './components/myDocuments/MyDocumentsPage';
import isAuthenticated from './utils/isAuthenticated';




export default (
  <div>
    <Route path="/" component={App} />
    <Route exact path="/" component={Greetings} />
    <Route exact path="/signup" component={SignupPage} />
    <Route exact path="/signin" component={SignInpage} />
    <Route exact path="/dashboard" component={isAuthenticated(DashboardPage)} />
    <Route exact path="/manage-users" component={isAuthenticated(UsersPage)} />
    <Route exact path="/me" component={isAuthenticated(ProfilePage)} />
    <Route exact path="/my-docs" component={isAuthenticated(MyDocumentsPage)} />
    <Route path="/" component={Footer} />
  </div>
);
