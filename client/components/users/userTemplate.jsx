import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAllUsersAction } from '../../actions/userActions';
import userCards from './userCards';

class UserTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.props.getAllUsersAction();
  }

  render() {
    console.log(this.props.users);
    return (
      <div className="col s12 m12 l12">
        <h3>Manage Users</h3>
        {
          (this.props.users.users &&
           this.props.users.users.length > 0)
          ?
            this.props.users.users.map(userCards)
          :
          'You have no users to manage. Practically, this is not possible! ;-D'
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
});

UserTemplate.propTypes = {
  getAllUsersAction: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  getAllUsersAction })(UserTemplate);
