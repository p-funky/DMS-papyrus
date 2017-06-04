import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import { deleteSelfAction } from '../../actions/userActions';

class DeleteAccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(userId) {
    this.props.deleteSelfAction(userId);
  }

  render() {
    return (
      <Modal
        trigger={
          <button className="btn-floating waves-effect red accent-4 white-text">
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

export default connect(null, { deleteSelfAction })(DeleteAccountModal);
