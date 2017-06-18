/* global Materialize */
import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { searchDocumentsAction }
  from '../../actions/documentActions';
import { searchUserAction }
  from '../../actions/userActions';

export class Search extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    let word = event.target.value;
    word = word.trim();
    const location = this.props.location.pathname;
    if (location === '/my-docs') {
      this.props.searchDocumentsAction(word, this.props.userId, location)
      .catch((error) => {
        Materialize.toast(error, 3000, 'red');
      });
    } else if (location === '/dashboard') {
      this.props.searchDocumentsAction(word, false, location);
    } else if (location === '/manage-users') {
      this.props.searchUserAction(word, false)
      .catch((error) => {
        Materialize.toast(error, 3000, 'red');
      });
    }
  }

  render() {
    const location = this.props.location.pathname;
    let placeholder;
    if (location === '/manage-users') {
      placeholder = 'search by name or username';
    } else {
      placeholder = 'search by title or content';
    }
    return (
      <div>
        <form onChange={this.onChange}>
          <div className="input-field">
            <input
              id="search"
              type="search"
              placeholder={placeholder}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    );
  }
}

Search.propTypes = {
  searchDocumentsAction: PropTypes.func.isRequired,
  searchUserAction: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired
};

export default withRouter(connect(null,
  { searchDocumentsAction, searchUserAction })(Search));
