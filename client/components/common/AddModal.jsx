/* global Materialize */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import Form from './Form';
import { addDocumentAction, addMyDocumentAction } from '../../actions/documentActions';

export class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      title: '',
      content: '',
      accessId: '1',
      documentId: ''
    };

    this.onChange = this.onChange.bind(this);
    this.handleAccessChange = this.handleAccessChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAccessChange(event) {
    const access = event.target.value;
    this.setState({ accessId: access });
  }

  handleAdd() {
    if (this.props.location.pathname === '/dashboard') {
      this.props.addDocumentAction(this.state)
        .then(() => {
          this.setState({
            title: '',
            content: '',
            accessId: '1',
          });
        }).catch((error) => {
          Materialize.toast(error, 3000, 'red');
        });
    } else if (this.props.location.pathname === '/my-docs') {
      this.props.addMyDocumentAction(this.state)
        .then(() => {
          this.setState({
            title: '',
            content: '',
            accessId: '1',
          });
        }).catch((error) => {
          Materialize.toast(error, 3000, 'red');
        });
    }
  }

  render() {
    return (
      <Modal
        trigger={
          <div className="fixed-action-btn">
            <button id="add-document" className="btn-floating btn-large blue lighten-2">
              <i className="large material-icons blue lighten-2">add</i>
            </button>
          </div>
        }
      >
        <Form
          title={this.state.title}
          accessId={this.state.accessId}
          content={this.state.content}
          onChange={this.onChange}
          handleAccessChange={this.handleAccessChange}
          onSubmit={this.handleAdd}
          documentId=""
        />
      </Modal>
    );
  }
}

AddModal.propTypes = {
  addDocumentAction: PropTypes.func.isRequired,
  addMyDocumentAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

export default withRouter(connect(null,
  { addDocumentAction, addMyDocumentAction })(AddModal));
