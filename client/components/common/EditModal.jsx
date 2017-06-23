/* global Materialize */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import Form from './Form';
import { editDocumentAction, myDocumentEditAction } from '../../actions/documentActions';

/**
 * @class EditModal
 * @extends {React.Component}
 */
export class EditModal extends React.Component {
  /**
   * Creates an instance of EditModal.
   * @param {object} props
   *
   * @memberOf EditModal
   */
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      title: this.props.document.title,
      content: this.props.document.content,
      accessId: this.props.document.accessId,
      documentId: this.props.document.id
    };

    this.onChange = this.onChange.bind(this);
    this.handleAccessChange = this.handleAccessChange.bind(this);
  }
  /**
   * This method changes in the input fields
   *
   * @param {object} event
   *
   * @memberof EditModal
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
 /**
   * This method updates the state of the input fields
   *
   * @param {object} event
   *
   * @memberof EditModal
   */
  handleAccessChange(event) {
    const access = event.target.value;
    this.setState({ accessId: access });
  }
  /**
   * This method handles editing of documents
   *
   * @memberof EditModal
   */
  handleEdit(documentId) {
    if (this.props.location.pathname === '/dashboard') {
      this.props.editDocumentAction(documentId, this.state)
      .catch((error) => {
        Materialize.toast(error, 3000, 'red');
      });
    } else if (this.props.location.pathname === '/my-docs') {
      const userId = this.props.user.userId;
      this.props.myDocumentEditAction(documentId, userId, this.state)
      .catch((error) => {
        Materialize.toast(error, 3000, 'red');
      });
    }
  }
  /**
   * renders the edit modal
   * 
   * @returns {object} jsx modal
   * 
   * @memberof EditModal
   */
  render() {
    return (
      <Modal
        trigger={
          <button id="edit-document" className="btn-floating waves-effect modal-trigger blue lighten-2 white-text">
            <i className="material-icons">mode_edit</i>
          </button>
          }
      >
        <Form
          title={this.state.title}
          accessId={this.state.accessId}
          content={this.state.content}
          onChange={this.onChange}
          handleAccessChange={this.handleAccessChange}
          onSubmit={this.handleEdit}
          documentId={this.props.document.id}
        />
      </Modal>
    );
  }
}

/**
 * mapStateToProps
 *
 * @param {object} state
 * @returns {object} user
 */
const mapStateToProps = state => ({
  user: state.authentication.userInfo,
});

EditModal.propTypes = {
  editDocumentAction: PropTypes.func.isRequired,
  myDocumentEditAction: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(connect(mapStateToProps,
  { editDocumentAction, myDocumentEditAction })(EditModal));
