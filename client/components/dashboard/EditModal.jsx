import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import { editDocumentAction } from '../../actions/documentActions';


class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleEdit = this.handleEdit.bind(this);
    this.state = {
      title: this.props.document.title,
      content: this.props.document.content,
      accessId: this.props.document.accessId
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
    this.props.editDocumentAction(documentId, this.state);
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
        <form className="col s12">
          <div className="row">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">input</i>
                <input
                  id="password"
                  type="text"
                  className="validate"
                  value={this.state.title}
                  onChange={this.onChange}
                  name="title"
                />
                <label className="active" htmlFor="title">new title</label>
              </div>
              <div className="input-field col s6">
                <select
                  className="browser-default"
                  name="accessId"
                  value={this.state.accessId}
                  onChange={this.handleAccessChange}
                >
                  <option value={1}>public</option>
                  <option value={2}>private</option>
                  <option value={3}>role</option>
                </select>
              </div>
            </div>
          </div>
          <div className="input-field col s12">
            <i className="material-icons prefix">mode_edit</i>
            <textarea
              id="textarea1"
              className="material-text-area"
              value={this.state.content}
              onChange={this.onChange}
              name="content"
            />
          </div>
          <div className="row">
            <button
              onClick={() => this.handleEdit(this.props.document.id)}
              className="modal-close btn blue lighten-2 waves-effect waves-light right"
              type="button"
              name="action"
            >
              Save<i className="mdi-content-send right" />
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

EditModal.propTypes = {
  editDocumentAction: PropTypes.func.isRequired,
  document: PropTypes.object.isRequired
};

export default withRouter(connect(null, { editDocumentAction })(EditModal));
