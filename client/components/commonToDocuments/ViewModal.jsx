import React from 'react';
import { Modal, Button } from 'react-materialize';
import PropTypes from 'prop-types';

class ViewModal extends React.Component {

  render() {
    return (
      <Modal
        trigger={
          <div id="view-document">
            <button className="btn-floating waves-effect modal-trigger grey accent-4 white-text">
              <i className="large material-icons">visibility</i>
            </button>
          </div>
        }
        actions={
          <div>
            <Button id="close-view" className="right" flat modal="close" waves="light">close</Button>
          </div>
          }
      >
        <h4>{this.props.document.title}</h4>
        {this.props.document.content}
        <br />
        <p>Author: {this.props.document.User.userName}</p>
      </Modal>
    );
  }
}

ViewModal.propTypes = {
  document: PropTypes.object.isRequired
};

export default ViewModal;
