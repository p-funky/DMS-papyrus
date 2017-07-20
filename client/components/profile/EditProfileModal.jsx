/* eslint-env browser */
/* global Materialize */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';
import lodash from 'lodash';
import { editProfileAction } from '../../actions/userActions';

/**
 * render edit profile modal
 * @class EditProfileModal
 * @extends {React.Component}
 */
export class EditProfileModal extends React.Component {
  /**
   * Creates an instance of NavigationBar.
   * @param {object} props
   *
   * @memberOf EditProfileModal
   */
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  /**
   * This method runs when the components receives props
   * 
   * @memberof EditProfileModal
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      userName: nextProps.profile.userName,
      firstName: nextProps.profile.firstName,
      lastName: nextProps.profile.lastName,
      email: nextProps.profile.email
    });
  }
  /**
   * This method changes in the input fields
   *
   * @param {object} event
   *
   * @memberof EditProfileModal
   */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  /**
   * This method updates the user's details
   *
   * @param {integer} userId
   *
   * @memberof EditProfileModal
   */
  handleUpdate(userId) {
    let suppliedDetails;
    suppliedDetails = lodash.pickBy(this.state, lodash.identity);
    const regex = /^\s+$/;
    if (this.state.password.match(regex) || this.state.password === '') {
      suppliedDetails = lodash.omit(suppliedDetails, ['password']);
    } else {
      suppliedDetails = this.state;
    }
    this.props.editProfileAction(userId, suppliedDetails)
      .then(() => {
        this.setState({
          userName: this.props.profile.userName,
          firstName: this.props.profile.firstName,
          lastName: this.props.profile.lastName,
          email: this.props.profile.email,
          password: ' '
        });
      }).catch((error) => {
        Materialize.toast(error, 3000, 'red');
      });
  }
  /**
   * renders the edit profile modal
   * 
   * @returns {modal} edit profile modal
   * 
   * @memberof EditProfileModal
   */
  render() {
    return (
      <Modal
        trigger={
          <button id="edit-profile" className="btn-floating waves-effect modal-trigger blue lighten-2 white-text">
            <i className="material-icons">mode_edit</i>
          </button>
          }
      >
        <form className="col s12">
          <div className="row">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">input</i>
                <input
                  type="text"
                  placeholder=""
                  value={this.state.userName}
                  onChange={this.onChange}
                  name="userName"
                  id="userName"
                />
                <label className="active" htmlFor="userName">username</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">input</i>
                <input
                  type="text"
                  placeholder=""
                  value={this.state.firstName}
                  onChange={this.onChange}
                  name="firstName"
                  id="firstName"
                />
                <label className="active" htmlFor="firstName">firstname</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">input</i>
                <input
                  type="text"
                  placeholder=""
                  value={this.state.lastName}
                  onChange={this.onChange}
                  name="lastName"
                  id="lastName"
                />
                <label className="active" htmlFor="lastName">lastname</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">input</i>
                <input
                  type="text"
                  placeholder=""
                  value={this.state.email}
                  onChange={this.onChange}
                  name="email"
                  id="email"
                />
                <label className="active" htmlFor="email">email</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">input</i>
                <input
                  id="password"
                  type="text"
                  placeholder=""
                  value={this.state.password}
                  onChange={this.onChange}
                  name="password"
                />
                <label className="active" htmlFor="password">password</label>
              </div>
            </div>
          </div>
          <div className="row">
            <button
              onClick={() => this.handleUpdate(this.props.profile.userId)}
              className="modal-close btn blue lighten-2 waves-effect waves-light right"
              type="button"
              name="action"
              id="update"
            >
              Update<i className="mdi-content-send right" />
            </button>
          </div>
        </form>
      </Modal>
    );
  }
}


EditProfileModal.propTypes = {
  editProfileAction: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default withRouter(connect(null,
  { editProfileAction })(EditProfileModal));

