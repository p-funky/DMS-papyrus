import React from 'react';
import PropTypes from 'prop-types';
import isEmail from '../../utils/helper';
import papyrus from '../../images/papyrus-ex.png';


class SignInForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
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
    this.props.userSignInRequest(data);
  }

  render() {
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
                    <label htmlFor="username|email">username or email</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">lock</i>
                    <input id="password" type="password" className="validate" required onChange={this.onChange} />
                    <label htmlFor="password">password</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s12">
                    <button className="btn blue lighten-2 waves-effect waves-light right" type="submit" name="action">Submit
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
