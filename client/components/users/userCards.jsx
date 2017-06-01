/* eslint-env browser */
import React from 'react';

const userCards = (user, index) => (
  <div key={index} className="col s6 m4 l3">
    <div className="card light-blue">
      <div className="card-content white-text">
        <span className="card-title">
          <h4>{user.userName}</h4>
        </span>
        <p>{user.firstName} {user.lastName}</p>
        <p>{user.roleId}</p>
      </div>
    </div>
  </div>
);

export default userCards;
