import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import Form from './Form';
import { editDocumentAction, myDocumentEditAction } from '../../actions/documentActions';


export class EditModal extends React.Component {
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

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAccessChange(event) {
    const access = event.target.value;
    this.setState({ accessId: access });
  }

  handleEdit(documentId) {
    if (this.props.location.pathname === '/dashboard') {
      this.props.editDocumentAction(documentId, this.state);
    } else if (this.props.location.pathname === '/my-docs') {
      const userId = this.props.user.userId;
      this.props.myDocumentEditAction(documentId, userId, this.state);
    }
  }

  render() {
    return (
      <Modal
        trigger={
          <button className="btn-floating waves-effect modal-trigger blue lighten-2 white-text">
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
