import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
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
          <li><Link to="/" className="grey-text text-darken-3 lighten-3">
                Log out
              </Link>
          </li>
          <li><Link to="/signup" className="grey-text text-darken-3 lighten-3">
                Sign Up
              </Link>
          </li>
          <li><Link to="/signin" className="grey-text text-darken-3 lighten-3">
                Sign In
              </Link>
          </li>
          <li>
            <Link
              to="/dashboard"
              className="grey-text text-darken-3 lighten-3"
            >
              <i className="material-icons">dashboard</i>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="grey-text text-darken-3 lighten-3">
              <i className="material-icons">assignment_ind</i>
            </Link>
          </li>
          <li>
            <Link to="/manage-users" className="grey-text text-darken-3 lighten-3">
              <i className="material-icons">supervisor_account</i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);
