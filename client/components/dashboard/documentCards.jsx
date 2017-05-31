/* eslint-env browser */
import React from 'react';
import ViewModal from './ViewModal';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';

const documentCards = (document, index) => (
  <div key={index} className="col s6 m4 l3">
    <div className="card light-blue">
      <div className="card-content white-text">
        <span className="card-title">
          <h4>{document.title}</h4>
        </span>
        <p>{document.content}</p>
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
