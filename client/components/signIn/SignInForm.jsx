/* global Materialize */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import isEmail from '../../utils/helper';
import papyrus from '../../images/papyrus-ex.png';

/**
 * render login form
 * @class SignInForm
 * @extends {React.Component}
 */
class SignInForm extends React.Component {
  /**
   * Creates an instance of SignInForm.
   * @param {object} props
   *
   * @memberOf SignInForm
   */
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * This method changes in the input fields
   *
   * @param {object} event
   *
   * @memberof SignInForm
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * This method submits the state of the input fields
   *
   * @param {object} event
   *
   * @memberof SignInForm
   */
  onSubmit(event) {
    event.preventDefault();
    const data = {};
    if (isEmail(this.state.credential)) {
      data.email = this.state.credential;
      data.password = this.state.password;
    } else {
      data.userName = this.state.credential;
      data.password = this.state.password;
    }
    this.props.userSignInRequest(data)
      .then(() => {
        this.setState({ loggedIn: true });
      }).catch((error) => {
        Materialize.toast(error, 3000, 'red');
      });
  }

  /**
   * renders the login form
   * 
   * @returns {from} login form
   * 
   * @memberof SignInForm
   */
  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return (
        <Redirect to="/dashboard" />
      );
    }
    return (
      <div>
        <div className="col s12 m12 l6">
          <div className="card-panel">
            <h4 className="center">Sign In</h4>
            <p className="center">Continue managing your documents</p>
            <div className="row">
              <form className="col s12" onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">input</i>
                    <input id="credential" type="text" className="validate" required onChange={this.onChange} />
                    <label className="active" htmlFor="credentiall">username or email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">lock</i>
                    <input id="password" type="password" className="validate" required onChange={this.onChange} />
                    <label className="active" htmlFor="password">password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button id="signInButton" className="btn blue lighten-2 waves-effect waves-light right" type="submit" name="action">Submit
                      <i className="mdi-content-send right" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col s12 m12 l6 center">
          <img src={papyrus} alt="" />
        </div>
      </div>
    );
  }
}

SignInForm.propTypes = {
  userSignInRequest: PropTypes.func.isRequired
};


export default SignInForm;
