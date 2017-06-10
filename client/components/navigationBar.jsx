import React from 'react';
import {
  withRouter,
  Link,
  Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import jwt from 'jsonwebtoken';
import { logOutAction } from '../actions/userActions';


class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loggedOut: false };
  }

  handleLogOut() {
    event.preventDefault();
    logOutAction();
    this.setState = ({ loggedOut: true });
  }

  render() {
    const { loggedOut } = this.state;
    if (loggedOut) {
      return (
        <Redirect to="/" />
      );
    }

    const token = localStorage.token;
    const user = jwt.decode(token);
    return (
      <div className="navbar-fixed blue lighten-2">
        <nav className="blue lighten-2">
          <div className="nav-wrapper">
            <Link
              to="/"
              className="brand-logo right grey-text text-darken-3 lighten-3"
            >
            Papyrus
            </Link>
            <ul id="nav-mobile" className="left hide-on-med-and-down">
              {
                (token)
                ?
                  <li>
                    <Link
                      to="/"
                      className="grey-text text-darken-3 lighten-3"
                      onClick={this.handleLogOut}
                    >
                    Log out
                    </Link>
                  </li>
                :
                  ''
              }
              {
                (!token)
                ?
                  <li><Link to="/signup" className="grey-text text-darken-3 lighten-3">
                        Sign Up
                      </Link>
                  </li>
                :
                ''
              }
              {
                (!token)
                ?
                  <li><Link to="/signin" className="grey-text text-darken-3 lighten-3">
                        Sign In
                      </Link>
                  </li>
                :
                ''
              }
              {
                (token)
                ?
                  <li>
                    <Link
                      to={{
                        pathname: '/my-docs',
                        state: { id: user.userId }
                      }}
                      className="grey-text text-darken-3 lighten-3"
                    >
                      <i className="material-icons">library_books</i>
                    </Link>
                  </li>
                :
                ''
              }
              {
                (token)
                ?
                  <li>
                    <Link
                      to="/dashboard"
                      className="grey-text text-darken-3 lighten-3"
                    >
                      <i className="material-icons">dashboard</i>
                    </Link>
                  </li>
                :
                ''
              }
              {
                (token)
                ?
                  <li>
                    <Link to="/me" className="grey-text text-darken-3 lighten-3">
                      <i className="material-icons">assignment_ind</i>
                    </Link>
                  </li>
                :
                ''
              }
              {
                (user && user.roleId === 1)
                ?
                  <li>
                    <Link to="/manage-users" className="grey-text text-darken-3 lighten-3">
                      <i className="material-icons">supervisor_account</i>
                    </Link>
                  </li>
                :
                ''
              }
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state
  };
};


export default withRouter(connect(mapStateToProps, null)(NavigationBar));
