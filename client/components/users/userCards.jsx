/* eslint-env browser */
import React from 'react';

const userCards = (user, index) => (
  <div key={index} className="col s6 m4 l3">
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
    </div>
  </div>
);

export default userCards;
