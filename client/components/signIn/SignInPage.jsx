import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SignInForm from './SignInForm';
import { userSignInRequest } from '../../actions/signInActions';

/**
 * render login page
 * @class SignInPage
 * @extends {React.Component}
 */
class SignInPage extends React.Component {
  /**
   * renders the login page
   * 
   * @returns {page} login page
   * 
   * @memberof SignInPage
   */
  render() {
    const userSignIn = this.props.userSignInRequest;
    return (
      <div className="row">
        <SignInForm userSignInRequest={userSignIn} />
      </div>
    );
  }
}

SignInPage.propTypes = {
  userSignInRequest: PropTypes.func.isRequired
};

export default withRouter(connect(null, { userSignInRequest })(SignInPage));
