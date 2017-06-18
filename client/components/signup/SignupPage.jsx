import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignupForm from './SignupForm';
import { userSignupRequest } from '../../actions/signupActions';

/**
 * render signup page
 * @class SignupPage
 * @extends {React.Component}
 */
class SignupPage extends React.Component {
  /**
   * renders the signup page
   * 
   * @returns {page} signup page
   * 
   * @memberof SignupPage
   */
  render() {
    const userSignup = this.props.userSignupRequest;
    return (
      <div className="row">
        <SignupForm userSignupRequest={userSignup} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default withRouter(connect(null, { userSignupRequest })(SignupPage));
