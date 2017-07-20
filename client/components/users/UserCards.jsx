/* eslint-env browser */
import React from 'react';
import UserDeleteModal from './UserDeleteModal';
import EditUserButton from './EditUserButton';

const userCards = user => (
  <div key={user.id} className="col s12 m4 l3">
    <div className="card">
      <div className="card-title white-text blue lighten-2">
        <h5>{user.userName}</h5>
      </div>
      <div className="card-content">
        <p><strong>Name: </strong>{user.firstName} {user.lastName}</p>
        <p><strong>Role: </strong>
          {
            (user.roleId === 1)
            ?
              'admin'
            :
              'regular'
          }
        </p>
      </div>
      <div className="card-action">
        <div className="col m4">
          <UserDeleteModal user={user} />
        </div>
        <div className="col m4">
          <EditUserButton user={user} />
        </div>
      </div>
    </div>
  </div>
);

export default userCards;
