import React from 'react';
import { Modal } from 'react-materialize';
import PropTypes from 'prop-types';

class viewModal extends React.Component {

  render() {
    return (
      <Modal
        trigger={
          <div>
            <button className="btn-floating waves-effect modal-trigger grey accent-4 white-text">
              <i className="large material-icons">visibility</i>
            </button>
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

viewModal.propTypes = {
  document: PropTypes.object.isRequired
};

export default viewModal;
