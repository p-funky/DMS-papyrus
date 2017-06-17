import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProfileAction } from '../../actions/userActions';
import EditProfileModal from './EditProfileModal';
import DeleteAccountModal from './DeleteAccountModal';

export class ProfileTemplate extends React.Component {

  componentWillMount() {
    this.props.getProfileAction();
  }

  render() {
    return (
      <div className="container">
        <div className="col s6 m4 l3">
          <h3>My Profile</h3>
          <div id="my-profile" className="card">
            <div className="card-title white-text blue lighten-2">
              <h5 id="my-profile">
                <i className="material-icons large">person_pin</i>
                {this.props.profile.userName}
              </h5>
            </div>
            <div className="card-content">
              <div className="left-align" id="my-profile">
                <ul>
                  <li>
                    <p>
                      <i className="material-icons grey-text">class</i>
                      <span>{this.props.profile.userId}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="material-icons grey-text">verified_user</i>
                      <span>{this.props.profile.firstName} {this.props.profile.lastName}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="material-icons grey-text">email</i>
                      <span>{this.props.profile.email}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      <i className="material-icons grey-text">label_outline</i>
                      <span>
                        {
                          (this.props.profile.roleId === 1)
                          ?
                            'admin'
                          :
                            'regular'
                        }
                      </span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <EditProfileModal profile={this.props.profile} />
          <DeleteAccountModal profile={this.props.profile} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile
});

ProfileTemplate.propTypes = {
  getProfileAction: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default withRouter(connect(mapStateToProps, {
  getProfileAction })(ProfileTemplate));
