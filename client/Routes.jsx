import React from 'react';
import { Route } from 'react-router-dom';
import App from './components/App';
import Greetings from './components/Greetings';
import SignupPage from './components/signup/SignupPage';
import SignInpage from './components/signIn/SignInPage';
import DashboardPage from './components/dashboard/DashboardPage';
import UsersPage from './components/users/UsersPage';
import Footer from './components/Footer';
import ProfilePage from './components/profile/ProfilePage';
import MyDocumentsPage from './components/myDocuments/MyDocumentsPage';
import IsAuthenticated from './utils/isAuthenticated';




export default (
  <div>
    <Route path="/" component={App} />
    <Route exact path="/" component={Greetings} />
    <Route exact path="/signup" component={SignupPage} />
    <Route exact path="/signin" component={SignInpage} />
    <Route exact path="/dashboard" component={IsAuthenticated(DashboardPage)} />
    <Route exact path="/manage-users" component={IsAuthenticated(UsersPage)} />
    <Route exact path="/me" component={IsAuthenticated(ProfilePage)} />
    <Route exact path="/my-docs" component={IsAuthenticated(MyDocumentsPage)} />
    <Route path="/" component={Footer} />
  </div>
);
