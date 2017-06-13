import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import { Redirect, withRouter } from 'react-router-dom';
import { deleteSelfAction } from '../../actions/userActions';

export class DeleteAccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loggedOut: false };
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(userId) {
    this.props.deleteSelfAction(userId);
    this.setState = ({ loggedOut: true });
    return (
      <Redirect to="/" />
    );
  }

  render() {
    const { loggedOut } = this.state;
    if (loggedOut) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <Modal
        trigger={
          <button
            className="btn-floating waves-effect white-text"
            style={{ backgroundColor: '#ee6e73' }}
          >
            <i className="material-icons">delete</i>
          </button>
        }
        actions={
          <div>
            <Button
              onClick={() => this.handleDelete(this.props.profile.id)}
              waves="light" className="modal-close red darken-2"
            >delete</Button>
            <Button flat modal="close" waves="light">dismiss</Button>
          </div>
          }
      > Are you sure you want to delete your account?
      <i className="material-icons yellow accent-4 white-text">report_problem</i>
      </Modal>
    );
  }
}

DeleteAccountModal.propTypes = {
  deleteSelfAction: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default withRouter(connect(null, { deleteSelfAction })(DeleteAccountModal));
