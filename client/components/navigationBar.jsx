import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <nav className="navbar-fixed blue lighten-2">
    <div className="nav-wrapper container">
      <Link to="/" className="brand-logo right grey-text text-darken-3 lighten-3">Papyrus</Link>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><Link to="/signup" className="grey-text text-darken-3 lighten-3">Sign Up</Link></li>
        <li><Link to="/signin" className="grey-text text-darken-3 lighten-3">Sign In</Link></li>
      </ul>
    </div>
  </nav>
);
