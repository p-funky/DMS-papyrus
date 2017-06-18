/* global Materialize */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import Form from './Form';
import { addDocumentAction, addMyDocumentAction } from '../../actions/documentActions';

/**
 * @class AddModal
 * @extends {React.Component}
 */
export class AddModal extends React.Component {
  /**
   * Creates an instance of AddModal.
   * @param {object} props
   *
   * @memberOf AddModal
   */
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
  /**
   * This method changes in the input fields
   *
   * @param {object} event
   *
   * @memberof AddModal
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
 /**
   * This method updates the state of the input fields
   *
   * @param {object} event
   *
   * @memberof AddModal
   */
  handleAccessChange(event) {
    const access = event.target.value;
    this.setState({ accessId: access });
  }
  /**
   * This method handles adding of documents
   *
   * @memberof AddModal
   */
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
  /**
   * renders the add modal
   * 
   * @returns {object} jsx modal
   * 
   * @memberof AddModal
   */
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
