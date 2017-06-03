/* eslint-env browser */
import React from 'react';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const documentCards = document => (
  <div key={document.id} className="col s6 m4 l3">
    <div className="card light-blue">
      <div className="card-content white-text">
        <span className="card-title">
          <h4>{document.title.substring(0, 10)}...</h4>
        </span>
        <p>{document.content.substring(0, 20)} ...</p>
        <br />
        <p>Author: {document.User.userName}</p>
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
