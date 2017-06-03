import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfileAction } from '../../actions/userActions';
import EditProfileModal from './EditProfileModal';

class ProfileTemplate extends React.Component {

  constructor(props) {
    super(props);
    this.props.getProfileAction();
  }

  render() {
    console.log(this.props.profile);
    return (
      <div className="col s6 m4 l3">
        <div className="card light-blue">
          <div className="card-content white-text">
            <p>
              <i className="material-icons">person_pin</i>
              {this.props.profile.userName}
            </p>
            <p>
              <i className="material-icons">class</i>
              {this.props.profile.id}
            </p>
            <p>
              <i className="material-icons">verified_user</i>
              {this.props.profile.firstName} {this.props.profile.lastName}
            </p>
            <p>
              <i className="material-icons">email</i>
              {this.props.profile.email}</p>
            <p><i className="material-icons">label_outline</i>
              {
                (this.props.profile.roleId === 1)
                ?
                  'admin'
                :
                  'regular'
              }
            </p>
          </div>
        </div>
        <EditProfileModal profile={this.props.profile} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.users,
});

ProfileTemplate.propTypes = {
  getProfileAction: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {
  getProfileAction })(ProfileTemplate);
