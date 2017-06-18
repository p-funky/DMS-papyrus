import React from 'react';
import ProfileTemplate from './ProfileTemplate';

/**
 * render profile page
 * @class ProfilePage
 * @extends {React.Component}
 */
class ProfilePage extends React.Component {
  /**
   * renders the profile page
   * 
   * @returns {page} profile page
   * 
   * @memberof ProfilePage
   */
  render() {
    return (
      <div className="center">
        <ProfileTemplate />
      </div>
    );
  }
}

export default ProfilePage;
