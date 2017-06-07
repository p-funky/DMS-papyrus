import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import { addDocumentAction } from '../../actions/documentActions';

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.state = {
      title: '',
      content: '',
      accessId: '1'
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
    console.log('==============================================', this.state);
    this.props.addDocumentAction(this.state)
      .then(() => {
        this.setState({
          title: '',
          content: '',
          accessId: '1',
        });
      });
  }

  render() {
    return (
      <Modal
        trigger={
          <div className="fixed-action-btn">
            <a className="btn-floating btn-large red">
              <i className="large material-icons green accent-4">add</i>
            </a>
          </div>
        }
      >
        <form className="col s12">
          <div className="row">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">input</i>
                <input
                  name="title"
                  type="text"
                  className="validate"
                  value={this.state.title}
                  onChange={this.onChange}
                />
                <label className="active" htmlFor="title">title</label>
              </div>
              <div className="input-field col s6">
                <select
                  className="browser-default"
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
              name="content"
              className="material-text-area"
              value={this.state.content}
              onChange={this.onChange}
            />
          </div>
          <div className="row">
            <button
              onClick={this.handleAdd}
              className="modal-close btn blue lighten-2 waves-effect waves-light right"
              type="button"
              name="action"
            >save
              <i className="mdi-content-send right" />
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}

AddModal.propTypes = {
  addDocumentAction: PropTypes.func.isRequired
};

export default connect(null, { addDocumentAction })(AddModal);
