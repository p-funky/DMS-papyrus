/* global Materialize */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt from 'jsonwebtoken';
import { editUserRoleAction } from '../../actions/userActions';

/**
 * render edit user role button
 * @class EditUserButton
 * @extends {React.Component}
 */
export class EditUserButton extends React.Component {
  constructor(props) {
    super(props);
    this.changeRole = this.changeRole.bind(this);
  }
  /**
   * This method updates the user's details
   *
   * @param {integer} userId
   * @param {integer} newRoleId
   *
   * @memberof EditUserButton
   */
  changeRole(userId, newRoleId) {
    if (newRoleId === 1) {
      newRoleId = 2;
    } else {
      newRoleId = 1;
    }
    this.props.editUserRoleAction(userId, { roleId: newRoleId })
    .catch((error) => {
      Materialize.toast(error, 3000, 'red');
    });
  }
  /**
   * renders the navigation bar
   * 
   * @returns {path} navigation bar
   * 
   * @memberof EditUserButton
   */
  render() {
    const token = localStorage.token;
    const user = token ? jwt.decode(token) : '';
    return (
      <div>
        {
          (this.props.user.id !== user.userId)
          ?
            <button
              id="edit-role"
              className="waves-effect waves-light btn blue lighten-2"
              onClick={() => this.changeRole(this.props.user.id, this.props.user.roleId)}
            > {
                (this.props.user.roleId === 1)
                ?
                  'demote'
                :
                  'promote'
              }
            </button>
          :
            <h5 id="self">
              <i className="material-icons blue-text text-lighten-2">star</i>
              Me
            </h5>
        }
      </div>
    );
  }
}

EditUserButton.propTypes = {
  editUserRoleAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default withRouter(connect(null, { editUserRoleAction })(EditUserButton));
