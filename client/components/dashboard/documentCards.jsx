/* eslint-env browser */
import React from 'react';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const accessDisplay = (accessId, roleId) => {
  if (accessId === 1) {
    return 'public';
  }
  if (accessId === 2) {
    return 'private';
  }
  if (accessId === 3) {
    if (roleId === 1) {
      return 'admin';
    }
    if (roleId === 2) {
      return 'regular';
    }
  }
};

const documentCards = document => (
  <div key={document.id} className="col s12 m4 l3">
    <div className="card">
      <div className="card-title white-text  blue lighten-2">
        <h5>{document.title.substring(0, 15)}...</h5>
      </div>
      <div className="card-content">
        <p>{document.content.substring(0, 25)} ...</p>
        <br />
        <p>Author: {document.User.userName}</p>
        <p>Access: {accessDisplay(document.accessId, (document.User.roleId))}</p>
      </div>
      <div className="card-action">
        <div className="col m4">
          <ViewModal document={document} />
        </div>
        <div className="col m4">
          <EditModal document={document} />
        </div>
        <div className="col m4">
          <DeleteModal document={document} />
        </div>
      </div>
    </div>
  </div>
);

export default documentCards;
