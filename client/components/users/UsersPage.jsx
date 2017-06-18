import React from 'react';
import UserTemplate from './UserTemplate';

/**
 * render the user page
 * @class UsersPage
 * @extends {React.Component}
 */
class UsersPage extends React.Component {
  /**
   * renders the navigation bar
   * 
   * @returns {path} navigation bar
   * 
   * @memberof UsersPage
   */
  render() {
    return (
      <div className="row">
        <UserTemplate />
      </div>
    );
  }
}

export default UsersPage;
