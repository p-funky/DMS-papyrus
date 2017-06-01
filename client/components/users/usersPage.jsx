import React from 'react';
import UserTemplate from './userTemplate';


class UsersPage extends React.Component {
  render() {
    return (
      <div className="row grey accent-2">
        <UserTemplate />
      </div>
    );
  }
}

export default UsersPage;
