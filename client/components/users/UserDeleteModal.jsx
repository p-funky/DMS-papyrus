/* global Materialize */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-materialize';
import jwt from 'jsonwebtoken';
import { deleteUserAction } from '../../actions/userActions';

export class UserDeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(userId) {
    this.props.deleteUserAction(userId)
    .catch((error) => {
      Materialize.toast(error, 3000, 'red');
    });
  }

  render() {
    const token = localStorage.token;
    const user = token ? jwt.decode(token) : '';
    return (
      <div>
        {
          (this.props.user.id !== user.userId)
          ?
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
                    onClick={() => this.handleDelete(this.props.user.id)}
                    waves="light" className="modal-close red darken-2"
                  >delete</Button>
                  <Button flat modal="close" waves="light">dismiss</Button>
                </div>
                }
            > Are you sure you want to delete this account?
              <i className="material-icons yellow accent-4 white-text">
                report_problem
              </i>
            </Modal>
          :
            ''
        }
      </div>
    );
  }
}

UserDeleteModal.propTypes = {
  deleteUserAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(connect(null, { deleteUserAction })(UserDeleteModal));
