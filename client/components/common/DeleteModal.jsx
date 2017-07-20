/* global Materialize */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import { deleteDocumentAction } from '../../actions/documentActions';

/**
 * @class DeleteModal
 * @extends {React.Component}
 */
export class DeleteModal extends React.Component {
  /**
   * Creates an instance of DeleteModal.
   * @param {object} props
   *
   * @memberOf DeleteModal
   */
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  /**
   * This method handles deleting of document
   *
   * @memberof DeleteModal
   */
  handleDelete(documentId) {
    this.props.deleteDocumentAction(documentId)
    .catch((error) => {
      Materialize.toast(error, 3000, 'red');
    });
  }
  /**
   * renders the delete modal
   * 
   * @returns {object} jsx modal
   * 
   * @memberof DeleteModal
   */
  render() {
    return (
      <Modal
        trigger={
          <button
            className="btn-floating waves-effect white-text"
            id="delete"
            style={{ backgroundColor: '#ee6e73' }}
          >
            <i className="material-icons">delete</i>
          </button>
        }
        actions={
          <div>
            <Button
              onClick={() => this.handleDelete(this.props.document.id)}
              waves="light" className="modal-close red darken-2"
              id="delete-document"
            >delete</Button>
            <Button flat modal="close" waves="light">dismiss</Button>
          </div>
          }
      > Are you sure you want to delete this document?
      <i className="material-icons yellow accent-4 white-text">report_problem</i>
      </Modal>
    );
  }
}

DeleteModal.propTypes = {
  deleteDocumentAction: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired
};

export default withRouter(connect(null, { deleteDocumentAction })(DeleteModal));
