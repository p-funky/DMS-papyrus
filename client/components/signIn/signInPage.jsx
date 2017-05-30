import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SignInForm from './signInForm';
import { userSignInRequest } from '../../actions/signInActions';

class SignInPage extends React.Component {
  render() {
    const { userSignInRequest } = this.props;
    return (
      <div className="row">
        <SignInForm userSignInRequest={userSignInRequest} />
      </div>
    );
  }
}

SignInPage.propTypes = {
  userSignInRequest: PropTypes.func.isRequired
};

export default connect(null, { userSignInRequest })(SignInPage);
