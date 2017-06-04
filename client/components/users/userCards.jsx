/* eslint-env browser */
import React from 'react';
import UserDeleteModal from './userDeleteModal';
import EditUserButton from './editUserButton';

const userCards = user => (
  <div key={user.id} className="col s6 m4 l3">
    <div className="card light-blue">
      <div className="card-content white-text">
        <span className="card-title">
          <h6><strong>Username: </strong>{user.userName}</h6>
        </span>
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
