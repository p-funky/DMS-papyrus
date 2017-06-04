import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { editUserRoleAction } from '../../actions/userActions';


class EditUserButton extends React.Component {
  constructor(props) {
    super(props);
    this.changeRole = this.changeRole.bind(this);
  }

  changeRole(userId, newRoleId) {
    if (newRoleId === 1) {
      newRoleId = 2;
    } else {
      newRoleId = 1;
    }
    this.props.editUserRoleAction(userId, { roleId: newRoleId });
  }

  render() {
    return (
      <button
        className="waves-effect waves-light btn"
        onClick={() => this.changeRole(this.props.user.id, this.props.user.roleId)}
      > {
          (this.props.user.roleId === 1)
          ?
            'demote'
          :
            'promote'
        }
      </button>
    );
  }
}

EditUserButton.propTypes = {
  editUserRoleAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

export default connect(null, { editUserRoleAction })(EditUserButton);
