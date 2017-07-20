/* global Materialize */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import papyrus from '../../images/papyrus-ex.png';

/**
 * render singup form
 * @class SignupForm
 * @extends {React.Component}
 */
class SignupForm extends React.Component {
  /**
   * Creates an instance of SignupForm.
   * @param {object} props
   *
   * @memberOf SignupForm
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
   * @memberof SignupForm
   */
  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  /**
   * This method submits the state of the input fields
   *
   * @param {object} event
   *
   * @memberof SignupForm
   */
  onSubmit(event) {
    event.preventDefault();
    this.props.userSignupRequest(this.state)
      .then(() => {
        this.setState({ loggedIn: true });
      }).catch((error) => {
        Materialize.toast(error, 3000, 'red');
      });
  }

  /**
   * renders the signup form
   * 
   * @returns {from} signup form
   * 
   * @memberof SignupForm
   */
  render() {
    const { loggedIn } = this.state;
    if (loggedIn) {
      return (
        <Redirect to="/dashboard" />
      );
    }
    return (
      <div id="signUpPage">
        <div className="col s12 m12 l6">
          <div className="card-panel">
            <h4 className="center">Register</h4>
            <p className="center">Start managing your documents now!</p>
            <div className="row">
              <form className="col s12" onSubmit={this.onSubmit}>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">perm_identity</i>
                    <input id="firstName" type="text" className="validate" required onChange={this.onChange} />
                    <label className="active" htmlFor="firstname">first name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">perm_identity</i>
                    <input id="lastName" type="text" className="validate" required onChange={this.onChange} />
                    <label className="active" htmlFor="lastname">last name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input id="userName" type="text" className="validate" required onChange={this.onChange} />
                    <label className="active" htmlFor="username">username</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input id="email" type="email" className="validate" required onChange={this.onChange} />
                    <label className="active" htmlFor="email">email</label>
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
                    <button id="signUpButton" className="btn blue lighten-2 waves-effect waves-light right" type="submit" name="action">Submit
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

SignupForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired
};

export default SignupForm;
